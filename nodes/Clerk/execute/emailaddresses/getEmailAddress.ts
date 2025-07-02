import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function getEmailAddress(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const emailAddressId = ef.getNodeParameter('emailAddressId', 0) as string | undefined;

		if (!emailAddressId) {
			throw new NodeOperationError(ef.getNode(), 'Email Address ID is required');
		}
		// TODO: fill in the rest of the parameters as needed
		ef.logger.info('Fetching email address details');
		const response = await client.emailAddresses.getEmailAddress(emailAddressId);
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'No email address found');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'EMAIL_ADDRESS_FETCH_ERROR');
	}
}
