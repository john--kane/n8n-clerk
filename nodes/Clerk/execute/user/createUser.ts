import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';


function isValidEmail(email: string): boolean {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}
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
		const ignorePasswordPolicies = ef.getNodeParameter('ignorePasswordPolicies', 0, false) as boolean;
		const _publicMetadata = ef.getNodeParameter('publicMetadata', 0, {}) as
			| UserPublicMetadata
			| undefined;
		const _privateMetadata = ef.getNodeParameter('privateMetadata', 0, {}) as
			| UserPrivateMetadata
			| undefined;

		if (!firstName || !lastName || !emailAddress || !isValidEmail(emailAddress) || !password) {
			throw new NodeOperationError(
				ef.getNode(),
				'First name, last name, email address, and password are required',
			);
		}

		// check if the email address is already in use
		const existingUsers = await client.users.getUserList({
			emailAddress: [emailAddress],
		});

		if (existingUsers.totalCount > 0) {
			throw new NodeOperationError(ef.getNode(), 'Email address is already in use');
		}

		// create the user
		const response = await client.users.createUser({
			firstName,
			lastName,
			emailAddress: [emailAddress],
			password,
			skipPasswordChecks: ignorePasswordPolicies, // Skip password checks for demo purposes
			publicMetadata: _publicMetadata,
			privateMetadata: _privateMetadata,
		});

		if (!response) {
			if (ignorePasswordPolicies) {
				throw new NodeOperationError(ef.getNode(), 'Please check the password complies with the policies set in Clerk');
			}
			throw new NodeOperationError(ef.getNode(), 'Failed to create user ....');
		}


		return Ok(response);

	} catch (error) {
		ef.logger.info('Error creating user:', error);
		return Failure(error as Error, ef, 'USER_CREATE_ERROR');
	}
}
