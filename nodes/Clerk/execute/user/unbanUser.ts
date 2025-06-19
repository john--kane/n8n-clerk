import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function unBanUser(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const userId = ef.getNodeParameter('userId', 0) as string | undefined;

		if (!userId) {
			throw new NodeOperationError(ef.getNode(), 'User ID is required');
		}

		const response = await client.users.unbanUser(userId);
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'USER_FETCH_ERROR');
	}
}
