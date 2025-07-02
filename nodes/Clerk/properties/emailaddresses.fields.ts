import { INodeProperties } from 'n8n-workflow';

// Session Fields
export const emailAddressFields: INodeProperties[] = [
	{
		displayName: 'Email Address ID',
		name: 'emailAddressId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the email address',
		displayOptions: {
			show: {
				resource: ['emailaddresses-api'],
				operation: ['get-email-address'],
			},
		},
	}, {
		displayName: 'User ID',
		name: 'email_userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user associated with the email address',
		displayOptions: {
			show: {
				resource: ['emailaddresses-api'],
				operation: ['create-email-address', 'update-email-address', 'delete-email-address'],
			},
		},
	}, {
		displayName: 'Email Address',
		name: 'email_address',
		type: 'string',
		default: '',
		required: true,
		description: 'The email address to create',
		displayOptions: {
			show: {
				resource: ['emailaddresses-api'],
				operation: ['create-email-address',],
			},
		},
	}, {
		displayName: 'Primary',
		name: 'email_primary',
		type: 'boolean',
		default: true,
		description: 'Whether this email address is the primary email address for the user',
		displayOptions: {
			show: {
				resource: ['emailaddresses-api'],
				operation: ['create-email-address', 'update-email-address'],
			},
		},

	}, {
		displayName: 'Verified',
		name: 'email_verified',
		type: 'boolean',
		default: true,
		description: 'Whether this email address is verified',
		displayOptions: {
			show: {
				resource: ['emailaddresses-api'],
				operation: ['create-email-address', 'update-email-address'],
			},
		},
	},


];
