import { INodeProperties } from 'n8n-workflow';

// Domain Operations
export const sessionOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['session-api'],
		},
	},

	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Session
			name: 'Get Session',
			action: 'Get session',
			description: 'Fetches an existing session',
			value: 'get-session',
			type: 'string',
		},
		{
			// Get Session List
			name: 'Get Session List',
			action: 'Get session list',
			description: 'Fetches a list of existing sessions',
			value: 'get-session-list',
			type: 'string',
		},
		{
			// Get Token
			name: 'Get Token',
			action: 'Get token',
			description: 'Generates a new token from a session',
			value: 'get-token',
		},
		{
			// Verify Session
			name: 'Verify Session',
			action: 'Verify session',
			description: 'Verifies an existing session',
			value: 'verify-session',
			type: 'string',
		},
		{
			// Revoke Session List
			name: 'Revoke Session List',
			action: 'Revoke session list',
			description: 'Revokes a list of existing sessions',
			value: 'revoke-session',
			type: 'string',
		},
	],
	default: 'get-session',
};
