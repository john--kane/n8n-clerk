import { INodeProperties } from 'n8n-workflow';

// Organization Fields
export const organizationFields: INodeProperties[] = [
	// Campos = Criar Instancia
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the organization to fetch',
		displayOptions: {
			show: {
				resource: ['organization-api'],
				operation: ['get-organization'],
			},
		},
	},
];
