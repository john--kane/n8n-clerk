import { INodeProperties } from 'n8n-workflow';

// Organization Operations
export const organizationOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['organization-api'], // Value do Resource
		},
	},

	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Organization
			name: 'Get Organization',
			action: 'Get organization',
			description: 'Fetches an organization by ID',
			value: 'get-organization',
			type: 'string',
		},
		{
			// Get Organization List
			name: 'Get Organization List',
			action: 'Get organization list',
			description: 'Fetches a list of organizations',
			value: 'get-organization-list',
			type: 'string',
		},
		{
			// Get Organization Invitation
			name: 'Get Organization Invitation',
			action: 'Get organization invitation',
			description: 'Fetches an organization invitation by ID',
			value: 'get-organization-invitation',
			type: 'string',
		},
		{
			// Get Organization Membership List
			name: 'Get Organization Membership List',
			action: 'Get organization membership list',
			description: 'Fetches a list of organization memberships',
			value: 'get-org-organization-membership-list',
			type: 'string',
		},
		{
			// Get Organization Invitation List
			name: 'Get Organization Invitation List',
			action: 'Get organization invitation list',
			description: 'Fetches a list of organization invitations',
			value: 'get-organization-invitation-list',
			type: 'string',
		},
	],
	// Definindo como padrão a opção "Criar Instancia"
	default: 'get-organization',
};
