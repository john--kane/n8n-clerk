import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function createUser(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const firstName = ef.getNodeParameter('firstName', 0) as string | undefined;
		const lastName = ef.getNodeParameter('lastName', 0) as string | undefined;
		const emailAddress = ef.getNodeParameter('emailAddress', 0) as string | undefined;
		const password = ef.getNodeParameter('password', 0) as string | undefined;
		const externalId = ef.getNodeParameter('externalId', 0, '') as string | undefined;
		const publicMetadata = ef.getNodeParameter('publicMetadata', 0, {}) as
			| UserPublicMetadata
			| undefined;
		if (!firstName || !lastName || !emailAddress || !password) {
			throw new NodeOperationError(
				ef.getNode(),
				'First name, last name, email address, and password are required',
			);
		}

		const response = await client.users.createUser({
			firstName,
			lastName,
			emailAddress: [emailAddress],
			password,
			publicMetadata,
			externalId,
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'USER_FETCH_ERROR');
	}
}
