import { INodeProperties } from 'n8n-workflow';
import { OAuthProviderList } from '../enums';

// User Fields
export const userFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user to fetch',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: [
					'get-user',
					'get-organization-membership-list',
					'get-user-oauth-access-token',
					'verify-password',
					'ban-user',
					'unban-user',
					'lock-user',
					'unlock-user',
				],
			},
		},
	},
	{
		displayName: 'User Query',
		name: 'query',
		type: 'string',
		default: '',
		description: 'The query to filter users',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['get-user-count'],
			},
		},
	},
	{
		displayName: 'OAuth Provider',
		name: 'provider',
		type: 'string',
		default: OAuthProviderList.Google.toString(),
		description: 'The OAuth provider for the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['get-user-oauth-access-token'],
			},
		},
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: {
			password: true,
		},
		default: '',
		description: 'The password for the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['verify-password'],
			},
		},
	},
];
