import { INodeProperties } from 'n8n-workflow';

// Domain Operations
export const emailAddressOperationsOptions: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['emailaddresses-api'],
		},
	},

	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			// Get Email Address
			name: 'Get Email Address',
			action: 'Get email address',
			description: 'Fetches an existing email address',
			value: 'get-email-address',
			type: 'string',
		},
		{
			// Create Email Address
			name: 'Create Email Address',
			action: 'Create email address',
			description: 'Creates a new email address',
			value: 'create-email-address',
			type: 'string',
		},
		{
			// Get Email Address
			name: 'Delete Email Address',
			action: 'Delete email address',
			description: 'Deletes an existing email address',
			value: 'delete-email-address',
			type: 'string',
		},
		{
			// Get Email Address
			name: 'Update Email Address',
			action: 'Update email address',
			description: 'Updates an existing email address',
			value: 'update-email-address',
			type: 'string',
		},
	],
	default: 'get-email-address',
};
