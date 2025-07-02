import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function createEmailAddress(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const userId = ef.getNodeParameter('email_userId', 0) as string | undefined;
		const emailAddress = ef.getNodeParameter('email_address', 0) as string | undefined;

		const emailPrimary = ef.getNodeParameter('email_primary', 0) as boolean | undefined;
		const emailVerified = ef.getNodeParameter('email_verified', 0) as boolean | undefined;

		if (!userId || !emailAddress) {
			throw new NodeOperationError(ef.getNode(), 'User ID and Email Address are required');
		}

		// TODO: fill in the rest of the parameters as needed
		ef.logger.info('Creating email address');
		const response = await client.emailAddresses.createEmailAddress({
			userId,
			emailAddress,
			primary: emailPrimary,
			verified: emailVerified,
		});
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'No email address created');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'EMAIL_ADDRESS_CREATE_ERROR');
	}
}
