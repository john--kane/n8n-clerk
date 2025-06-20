import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getInvitationList(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const query = ef.getNodeParameter('invitationQuery', 0) as string | undefined;

		// TODO: fill in the rest of the parameters as needed
		ef.logger.info('Fetching invitation details');
		const response = await client.invitations.getInvitationList({
			query,
		});
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'No invitations found');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'INVITATION_FETCH_ERROR');
	}
}
