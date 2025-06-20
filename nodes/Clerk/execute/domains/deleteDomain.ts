import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function deleteDomain(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const satelliteDomainId = ef.getNodeParameter('satelliteDomainId', 0) as string | undefined;
		if (!satelliteDomainId) {
			throw new NodeOperationError(ef.getNode(), 'Satellite Domain ID is required');
		}

		ef.logger.info(`Deleting domain: ${satelliteDomainId}`);
		const response = await client.domains.delete(satelliteDomainId);
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'DOMAIN_DELETE_ERROR');
	}
}
