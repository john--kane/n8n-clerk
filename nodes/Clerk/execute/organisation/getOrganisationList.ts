import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getOrganizationList(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const limit = ef.getNodeParameter('limit', 0) as number | undefined;
		const offset = ef.getNodeParameter('offset', 0) as number | undefined;
		const query = ef.getNodeParameter('query', 0) as string | undefined;
		if (limit === undefined || limit < 1) {
			throw new NodeOperationError(ef.getNode(), 'Limit must be a positive number');
		}
		if (offset === undefined || offset < 0) {
			throw new NodeOperationError(ef.getNode(), 'Offset must be a non-negative number');
		}
		const response = await client.organizations.getOrganizationList({
			limit,
			offset,
			query,
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ORGANIZATION_FETCH_ERROR');
	}
}
