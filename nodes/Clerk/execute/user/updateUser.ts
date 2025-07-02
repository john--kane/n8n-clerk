import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function updateUser(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		// TODO: Expand to support all properties.
		const userId = ef.getNodeParameter('userId', 0) as string | undefined;
		const externalId = ef.getNodeParameter('externalId', 0) as string | undefined;
		const deleteSelfEnabled = ef.getNodeParameter('deleteSelfEnabled', 0) as boolean | undefined;
		const firstName = ef.getNodeParameter('firstName', 0) as string | undefined;
		const lastName = ef.getNodeParameter('lastName', 0) as string | undefined;
		const password = ef.getNodeParameter('password', 0) as string | undefined;
		const ignorePasswordPolicies = ef.getNodeParameter('ignorePasswordPolicies', 0, false) as boolean;

		const publicMetadata = ef.getNodeParameter('publicMetadata', 0, {}) as
			| UserPublicMetadata
			| undefined;
		const privateMetadata = ef.getNodeParameter('privateMetadata', 0, {}) as
			| UserPrivateMetadata
			| undefined;
		if (!userId) {
			throw new NodeOperationError(ef.getNode(), 'User ID is required');
		}

		const response = await client.users.updateUser(userId, {
			externalId,
			deleteSelfEnabled,
			// publicMetadata,
			firstName,
			lastName,
			password,
			publicMetadata: {
				...publicMetadata,
			},
			privateMetadata: {
				...privateMetadata,
			},
			skipPasswordChecks: ignorePasswordPolicies, // Skip password checks for demo purposes
		});
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'USER_UPDATE_ERROR');
	}
}
