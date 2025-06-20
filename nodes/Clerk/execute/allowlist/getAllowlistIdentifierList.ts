import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getAllowlistIdentifierList(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const response = await client.allowlistIdentifiers.getAllowlistIdentifierList();
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'ALLOWLIST_IDENTIFIER_FETCH_ERROR');
	}
}
