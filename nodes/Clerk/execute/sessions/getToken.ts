import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getToken(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}
		ef.logger.info('Fetching session details');
		const sessionId = ef.getNodeParameter('sessionId', 0) as string | undefined;
		const template = ef.getNodeParameter('template', 0) as string | undefined;

		if (!sessionId || !template) {
			throw new NodeOperationError(ef.getNode(), 'Session identifier and template are required');
		}

		// The name of the JWT template from the Clerk Dashboard to generate a new token from. For example: 'firebase', 'grafbase', or your custom template's name.
		const response = await client.sessions.getToken(sessionId, template);
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'SESSION_FETCH_ERROR');
	}
}
