import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getUserList(ef: IExecuteFunctions) {
	try {
		const userId = ef.getNodeParameter('userId', 0) as string | undefined;
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;
		if (!userId) {
			throw new NodeOperationError(ef.getNode(), 'User ID is required');
		}
		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const response = await client.users.getUser(userId);
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'USER_FETCH_ERROR');
	}
}
