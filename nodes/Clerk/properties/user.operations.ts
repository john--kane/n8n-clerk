import { INodeProperties } from 'n8n-workflow';

// Users Operations
export const userOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['users-api'], // Value do Resource
		},
	},
	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Organization Membership List
			name: 'Get Organization Membership List',
			action: 'Get organization membership list',
			description: 'Fetches a list of organization memberships for a user',
			value: 'get-organization-membership-list',
		},
		{
			// Get User
			name: 'Get User',
			action: 'Get user',
			description: 'Fetches a user by ID',
			value: 'get-user',
		},
		{
			// Get User Count
			name: 'Get User Count',
			action: 'Get user count',
			description: 'Fetches the count of users',
			value: 'get-user-count',
		},
		{
			// Get User List
			name: 'Get User List',
			action: 'Get user list',
			description: 'Fetches a list of users',
			value: 'get-user-list',
		},
		{
			// Get User OAuth Access Token
			name: 'Get User OAuth Access Token',
			action: 'Get user auth access token',
			description: 'Fetches the OAuth access token for a user',
			value: 'get-user-oauth-access-token',
		},
		{
			// Verify Password
			name: 'Verify Password',
			action: 'Verify password',
			description: "Verifies a user's password",
			value: 'verify-password',
		},
		{
			// Ban User
			name: 'Ban User',
			action: 'Ban user',
			description: 'Bans a user',
			value: 'ban-user',
		},
		{
			// Unban User
			name: 'Unban User',
			action: 'Unban user',
			description: 'Unbans a user',
			value: 'unban-user',
		},
		{
			// Lock User
			name: 'Lock User',
			action: 'Lock user',
			description: 'Locks a user',
			value: 'lock-user',
		},
		{
			// Unlock User
			name: 'Unlock User',
			action: 'Unlock user',
			description: 'Unlocks a user',
			value: 'unlock-user',
		},
	],
	default: 'get-user',
};
