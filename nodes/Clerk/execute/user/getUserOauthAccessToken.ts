import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, GetParam, GetProviderForString, Ok } from '../../utils';

export async function getUserOauthAccessToken(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const userId = GetParam.call(ef, 'userId') as string | undefined;
		const providerString = GetParam.call(ef, 'provider') as string;

		if (!userId || !providerString) {
			throw new NodeOperationError(ef.getNode(), 'User ID and provider are required');
		}

		const provider = GetProviderForString(providerString); // Validate provider
		if (!provider) {
			throw new NodeOperationError(ef.getNode(), `Invalid OAuth provider: ${providerString}`);
		}
		const response = await client.users.getUserOauthAccessToken(userId, provider);

		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'USER_FETCH_ERROR');
	}
}
