import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ClerkKeyApi implements ICredentialType {
	name = 'clerkKeyApi';

	displayName = 'Clerk Api Key API';
	documentationUrl = 'https://docs.clerk.com/reference/api-keys';

	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Secret Key',
			name: 'secretkey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Publishable Key',
			name: 'publishableKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
