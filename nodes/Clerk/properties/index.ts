import { INodeProperties } from 'n8n-workflow';
import { organizationFields } from './organisation.fields';
import { organizationOperationsOptions } from './organization.operations';
import { userFields } from './user.fields';
import { userOperationsOptions } from './user.operations';

const clerkOptions: INodeProperties = {
	displayName: 'Clerk Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'User API',
			value: 'users-api',
		},
		{
			name: 'Organization API',
			value: 'organization-api',
		},
	],
	default: 'users-api',
};

export const clerkNodeProperties = [
	clerkOptions,
	// User Operations
	userOperationsOptions,
	...userFields,
	// Organization Operations
	organizationOperationsOptions,
	...organizationFields,
] as INodeProperties[];
