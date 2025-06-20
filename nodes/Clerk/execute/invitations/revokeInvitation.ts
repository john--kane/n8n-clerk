import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function revokeInvitation(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const invitationId = ef.getNodeParameter('invitationId', 0) as string | undefined;

		if (!invitationId) {
			throw new NodeOperationError(ef.getNode(), 'Invitation ID is required');
		}

		ef.logger.info('Revoking invitation');
		const response = await client.invitations.revokeInvitation(invitationId);
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'Failed to revoke invitation');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'INVITATION_FETCH_ERROR');
	}
}
