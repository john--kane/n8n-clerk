import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function updateEmailAddress(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const emailAddressId = ef.getNodeParameter('email_userId', 0) as string | undefined;

		const emailPrimary = ef.getNodeParameter('email_primary', 0) as boolean | undefined;
		const emailVerified = ef.getNodeParameter('email_verified', 0) as boolean | undefined;

		if (!emailAddressId) {
			throw new NodeOperationError(ef.getNode(), 'Email Address ID is required');
		}
		// TODO: fill in the rest of the parameters as needed
		ef.logger.info('Fetching email address details');
		const response = await client.emailAddresses.updateEmailAddress(emailAddressId, {
			primary: emailPrimary,
			verified: emailVerified,
		});
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'No email address found');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'UPDATE_EMAIL_ADDRESS_ERROR');
	}
}
