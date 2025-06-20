import { ClerkClient } from '@clerk/backend';
import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { Failure, GetClerkClient, Ok } from '../../utils';

export async function createInvitation(ef: IExecuteFunctions) {
	try {
		const client = (await GetClerkClient.call(ef)) as ClerkClient | undefined;

		if (!client) {
			throw new NodeOperationError(ef.getNode(), 'Clerk client is not initialized');
		}

		const emailAddress = ef.getNodeParameter('invitationEmailAddress', 0) as string | undefined;
		const redirectUrl = ef.getNodeParameter('redirectUrl', 0) as string | undefined;
		const ignoreExisting = ef.getNodeParameter('ignoreExisting', 0) as boolean | undefined;

		if (!emailAddress) {
			throw new NodeOperationError(ef.getNode(), 'Email address is required');
		}

		const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
		if (!isValidEmail) {
			throw new NodeOperationError(ef.getNode(), 'Invalid email address format');
		}

		ef.logger.info(`Creating invitation with email address: ${emailAddress}`);
		ef.logger.info(`Redirect URL: ${redirectUrl}`);
		ef.logger.info(`Ignore existing: ${ignoreExisting}`);

		const response = await client.invitations.createInvitation({
			emailAddress,
		});
		if (!response) {
			throw new NodeOperationError(ef.getNode(), 'No invitations found');
		}
		return Ok(response);
	} catch (error) {
		return Failure(error as Error, ef, 'INVITATION_FETCH_ERROR');
	}
}
