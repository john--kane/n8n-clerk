import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getCount(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const query = ef.getNodeParameter('query', 0) as string | undefined;
		if (query) {
			const response = await client.users.getCount({
				query,
			});
			return Ok(response);
		} else {
			const response = await client.users.getCount();
			return Ok(response);
		}
	} catch (error) {
		return Failure(error as Error, ef, 'USER_FETCH_ERROR');
	}
}
