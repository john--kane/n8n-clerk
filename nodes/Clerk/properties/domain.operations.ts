import { INodeProperties } from 'n8n-workflow';

// Domain Operations
export const domainOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['domain-api'],
		},
	},

	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Allowlist Identifier List
			name: 'Delete Domain',
			action: 'Delete domain',
			description: 'Deletes an existing satellite domain',
			value: 'delete-domain',
			type: 'string',
		},
	],
	default: 'delete-domain',
};
