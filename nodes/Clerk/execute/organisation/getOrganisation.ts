import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getOrganization(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const organizationId = ef.getNodeParameter('organizationId', 0) as string | undefined;
		if (!organizationId) {
			throw new NodeOperationError(ef.getNode(), 'Organization ID is required');
		}

		const response = await client.organizations.getOrganization({
			organizationId,
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ORGANIZATION_FETCH_ERROR');
	}
}
