import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function deleteAllowlistIdentifier(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const identifier = ef.getNodeParameter('identifier', 0) as string | undefined;
		if (!identifier) {
			throw new NodeOperationError(ef.getNode(), 'Identifier is required');
		}

		// const list = await client.allowlistIdentifiers.getAllowlistIdentifierList(); // Ensure the list is fetched before deletion

		// if (!list.data.some((item) => item.identifier === identifier)) {
		// 	throw new NodeOperationError(
		// 		ef.getNode(),
		// 		`Identifier "${identifier}" does not exist in the allowlist`,
		// 	);
		// }
		ef.logger.info(`Deleting allowlist identifier: ${identifier}`);
		const response = await client.allowlistIdentifiers.deleteAllowlistIdentifier(identifier);
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ALLOWLIST_IDENTIFIER_DELETE_ERROR');
	}
}
