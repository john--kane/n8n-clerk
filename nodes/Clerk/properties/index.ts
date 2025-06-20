import { INodeProperties } from 'n8n-workflow';

import { allowlistFields } from './allowlist.fields';
import { allowlistOperationsOptions } from './allowlist.operations';
import { domainFields } from './domain.fields';
import { domainOperationsOptions } from './domain.operations';
import { invitationFields } from './invitation.fields';
import { invitationOperationsOptions } from './invitation.operations';
import { organizationFields } from './organization.fields';
import { organizationOperationsOptions } from './organization.operations';
import { sessionFields } from './session.fields';
import { sessionOperationsOptions } from './session.operations';
import { userFields } from './user.fields';
import { userOperationsOptions } from './user.operations';

const clerkOptions: INodeProperties = {
	displayName: 'Clerk Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			name: 'User API',
			value: 'users-api',
		},
		{
			name: 'Organization API',
			value: 'organization-api',
		},
		{
			name: 'Allowlist API',
			value: 'allowlist-api',
		},
		{
			name: 'Domain API',
			value: 'domain-api',
		},
		{
			name: 'Session API',
			value: 'session-api',
		},
		{
			name: 'Invitation API',
			value: 'invitation-api',
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
	// Allowlist Operations
	allowlistOperationsOptions,
	...allowlistFields,
	// Domain Operations
	domainOperationsOptions,
	...domainFields,
	// Session Operations
	sessionOperationsOptions,
	...sessionFields,
	// Invitation Operations
	invitationOperationsOptions,
	...invitationFields,
] as INodeProperties[];
