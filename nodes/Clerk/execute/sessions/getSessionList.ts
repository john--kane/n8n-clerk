import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getSessionList(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const sessionUserId = ef.getNodeParameter('sessionUserId', 0) as string | undefined;
		ef.logger.info('Fetching session details');
		const response = await client.sessions.getSessionList({
			userId: sessionUserId,
		});
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'No sessions found');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'SESSION_FETCH_ERROR');
	}
}
