import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getOrganizationInvitationList(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const organizationId = ef.getNodeParameter('organizationId', 0) as string | undefined;
		const limit = ef.getNodeParameter('limit', 0) as number | undefined;
		const offset = ef.getNodeParameter('offset', 0) as number | undefined;
		//TODO: Add status support

		if (!organizationId) {
			throw new NodeOperationError(ef.getNode(), 'Organization ID and Limit are required');
		}

		let response = await client.organizations.getOrganizationInvitationList({
			organizationId,
			limit,
			offset,
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ORGANIZATION_FETCH_ERROR');
	}
}
