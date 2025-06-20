import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getSession(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}
		ef.logger.info('Fetching session details');
		const identifier = ef.getNodeParameter('identifier', 0) as string | undefined;
		if (!identifier) {
			throw new NodeOperationError(ef.getNode(), 'Session identifier is required');
		}

		const response = await client.sessions.getSession(identifier);
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'SESSION_FETCH_ERROR');
	}
}
