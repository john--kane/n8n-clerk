import { INodeProperties } from 'n8n-workflow';

// Invitation Operations
export const invitationOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['invitation-api'],
		},
	},

	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Invitation List
			name: 'Get Invitation List',
			action: 'Get invitation list',
			description: 'Fetches a list of existing invitations',
			value: 'get-invitation-list',
			type: 'string',
		},
		{
			// Create Invitation
			name: 'Create Invitation',
			action: 'Create invitation',
			description: 'Creates a new invitation',
			value: 'create-invitation',
			type: 'string',
		},
		{
			// Revoke Invitation
			name: 'Revoke Invitation',
			action: 'Revoke invitation',
			description: 'Revokes an existing invitation',
			value: 'revoke-invitation',
			type: 'string',
		},
	],
	default: 'get-invitation-list',
};
