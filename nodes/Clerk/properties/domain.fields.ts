import { INodeProperties } from 'n8n-workflow';

// Domain Fields
export const domainFields: INodeProperties[] = [
	{
		displayName: 'Satellite Domain ID',
		name: 'satelliteDomainId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the satellite domain to delete',
		displayOptions: {
			show: {
				resource: ['domain-api'],
				operation: ['delete-domain'],
			},
		},
	},
];
