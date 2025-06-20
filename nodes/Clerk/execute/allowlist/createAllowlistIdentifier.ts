import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function createAllowlistIdentifier(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const identifier = ef.getNodeParameter('identifier', 0) as string | undefined;
		const notify = ef.getNodeParameter('notify', 0, false) as boolean;

		ef.logger.info(`Creating allowlist identifier: ${identifier}, notify: ${notify}`);
		if (!identifier) {
			throw new NodeOperationError(ef.getNode(), 'Identifier is required');
		}

		const list = await client.allowlistIdentifiers.getAllowlistIdentifierList();

		if (list.data.some((item) => item.identifier === identifier)) {
			throw new NodeOperationError(
				ef.getNode(),
				`Identifier "${identifier}" already exists in the allowlist`,
			);
		}
		const response = await client.allowlistIdentifiers.createAllowlistIdentifier({
			identifier,
			notify,
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ALLOWLIST_IDENTIFIER_FETCH_ERROR');
	}
}
