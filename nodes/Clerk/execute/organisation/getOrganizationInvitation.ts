import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getOrganizationInvitation(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const organizationId = ef.getNodeParameter('organizationId', 0) as string | undefined;
		const invitationId = ef.getNodeParameter('invitationId', 0) as string | undefined;

		if (!organizationId || !invitationId) {
			throw new NodeOperationError(ef.getNode(), 'Organization ID and Invitation ID are required');
		}

		const response = await client.organizations.getOrganizationInvitation({
			organizationId,
			invitationId,
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ORGANIZATION_FETCH_ERROR');
	}
}
