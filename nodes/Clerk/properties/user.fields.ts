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
					'update-user',
					'delete-user',
					'disable-user-mfa',
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
				operation: ['verify-password', 'create-user', 'update-user'],
			},
		},
	},
	{
		displayName: 'Apply Password Policies',
		name: 'ignorePasswordPolicies',
		type: 'boolean',
		default: true,
		description: 'Whether to ignore password policies for the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['create-user', 'update-user'],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		default: '',
		description: 'The first name of the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['create-user', 'update-user'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		default: '',
		description: 'The last name of the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['create-user', 'update-user'],
			},
		},
	},
	{
		displayName: 'Email Address',
		name: 'emailAddress',
		type: 'string',
		default: '',
		description: 'The email address of the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['create-user'],
			},
		},
	},
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		default: '',
		description: 'The external ID of the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['update-user'],
			},
		},
	},
	{
		displayName: 'Public Metadata',
		name: 'publicMetadata',
		type: 'json',
		default: '{}',
		description: 'The public metadata for the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['create-user', 'update-user'],
			},
		},
		validateType: 'object',
	},
	{
		displayName: 'Private Metadata',
		name: 'privateMetadata',
		type: 'json',
		default: '{}',
		description: 'The private metadata for the user',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['create-user', 'update-user'],
			},
		},
		validateType: 'object',
	},
	{
		displayName: 'Delete Self Enabled',
		name: 'deleteSelfEnabled',
		type: 'boolean',
		default: false,
		description: 'Whether the user can delete their own account',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['update-user'],
			},
		},
	},
];
