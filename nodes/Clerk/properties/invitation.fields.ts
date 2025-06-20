import { INodeProperties } from 'n8n-workflow';

// Invitation Fields
export const invitationFields: INodeProperties[] = [
	{
		displayName: 'Email Address',
		name: 'invitationEmailAddress',
		type: 'string',
		default: '',
		required: true,
		description: 'The email address to send the invitation to',
		displayOptions: {
			show: {
				resource: ['invitation-api'],
				operation: ['create-invitation'],
			},
		},
	},
	{
		displayName: 'Redirect URL',
		name: 'redirectUrl',
		type: 'string',
		default: '',
		description: 'The URL to redirect the user to after accepting the invitation',
		displayOptions: {
			show: {
				resource: ['invitation-api'],
				operation: ['create-invitation'],
			},
		},
	},
	{
		displayName: 'Ignore Existing Invitation',
		name: 'ignoreExisting',
		type: 'boolean',
		default: false,
		description: 'Whether to ignore existing invitations for the same email address',
		displayOptions: {
			show: {
				resource: ['invitation-api'],
				operation: ['create-invitation'],
			},
		},
	},
	{
		displayName: 'Invitation ID',
		name: 'invitationId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the invitation to fetch or delete',
		displayOptions: {
			show: {
				resource: ['invitation-api'],
				operation: ['revoke-invitation'],
			},
		},
	},
	{
		displayName: 'Invitation Query',
		name: 'invitationQuery',
		type: 'string',
		default: '',
		description: 'The query to filter invitations (e.g., email address)',
		displayOptions: {
			show: {
				resource: ['invitation-api'],
				operation: ['get-invitation-list'],
			},
		},
	},
];
