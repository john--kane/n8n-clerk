import { INodeProperties } from 'n8n-workflow';

// Session Fields
export const sessionFields: INodeProperties[] = [
	{
		displayName: 'Session ID',
		name: 'sessionId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the session',
		displayOptions: {
			show: {
				resource: ['session-api'],
				operation: ['get-session', 'get-token', 'verify-session', 'revoke-session'],
			},
		},
	},
	{
		displayName: 'Template',
		name: 'template',
		type: 'string',
		default: '',
		required: true,
		description:
			"The name of the JWT template from the Clerk Dashboard to generate a new token from. For example: 'firebase', 'grafbase', or your custom template's name.",
		displayOptions: {
			show: {
				resource: ['session-api'],
				operation: ['get-token'],
			},
		},
	},
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		required: true,
		description: 'The token to verify the session',
		displayOptions: {
			show: {
				resource: ['session-api'],
				operation: ['verify-session'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'sessionUserId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user to fetch sessions for',
		displayOptions: {
			show: {
				resource: ['session-api'],
				operation: ['get-session-list'],
			},
		},
	},
];
