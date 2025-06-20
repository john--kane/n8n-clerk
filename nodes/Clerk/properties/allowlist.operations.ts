import { INodeProperties } from 'n8n-workflow';

// Allowlist Operations
export const allowlistOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['allowlist-api'], // Value do Resource
		},
	},

	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Allowlist Identifier List
			name: 'Get Allowlist Identifier List',
			action: 'Get allowlist identifier list',
			description: 'Fetches a list of allowlist identifiers',
			value: 'get-allowlist-identifier-list',
			type: 'string',
		},
		{
			// Create Allowlist Identifier
			name: 'Create Allowlist Identifier',
			action: 'Create allowlist identifier',
			description: 'Creates a new allowlist identifier',
			value: 'create-allowlist-identifier',
			type: 'string',
		},
		{
			// Delete Allowlist Identifier
			name: 'Delete Allowlist Identifier',
			action: 'Delete allowlist identifier',
			description: 'Deletes an existing allowlist identifier',
			value: 'delete-allowlist-identifier',
			type: 'string',
		},
	],
	default: 'get-allowlist-identifier-list',
};
