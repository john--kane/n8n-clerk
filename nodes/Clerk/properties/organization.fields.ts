import { INodeProperties } from 'n8n-workflow';

// Organization Fields
export const organizationFields: INodeProperties[] = [
	//
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
				operation: [
					'get-organization',
					'get-organization-invitation',
					'get-org-organization-membership-list',
					'get-organization-invitation-list',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['organization-api'],
				operation: [
					'get-organization-list',
					'get-org-organization-membership-list',
					'get-organization-invitation-list',
				],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description: 'Cursor for pagination',
		displayOptions: {
			show: {
				resource: ['organization-api'],
				operation: [
					'get-organization-list',
					'get-org-organization-membership-list',
					'get-organization-invitation-list',
				],
			},
		},
	},

	{
		displayName: 'User Query',
		name: 'query',
		type: 'string',
		default: '',
		description: 'The query to filter users',
		displayOptions: {
			show: {
				resource: ['users-api'],
				operation: ['get-organization-list'],
			},
		},
	},
	{
		displayName: 'Invitation ID',
		name: 'invitationId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the organization invitation to fetch',
		displayOptions: {
			show: {
				resource: ['organization-api'],
				operation: ['get-organization-invitation'],
			},
		},
	},
];
