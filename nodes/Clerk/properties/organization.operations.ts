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

	options: [
		{
			// Get Organization
			name: 'Get Organization',
			action: 'Get organization',
			description: 'Fetches an organization by ID',
			value: 'get-organization',
			type: 'string',
		},
	],
	// Definindo como padrão a opção "Criar Instancia"
	default: 'get-organization',
};
