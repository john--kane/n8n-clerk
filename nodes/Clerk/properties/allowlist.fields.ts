import { INodeProperties } from 'n8n-workflow';

// Allowlist Fields
export const allowlistFields: INodeProperties[] = [
	{
		displayName: 'Identifier',
		name: 'identifier',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the allowlist identifier to fetch',
		displayOptions: {
			show: {
				resource: ['allowlist-api'],
				operation: ['create-allowlist-identifier', 'delete-allowlist-identifier'],
			},
		},
	},

	{
		displayName: 'Notify',
		name: 'notify',
		type: 'boolean',
		default: false,
		description: 'Whether to notify the user about the allowlist identifier creation',
		displayOptions: {
			show: {
				resource: ['allowlist-api'],
				operation: ['create-allowlist-identifier'],
			},
		},
	},
];
