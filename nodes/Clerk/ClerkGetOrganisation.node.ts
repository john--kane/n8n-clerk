import { createClerkClient } from '@clerk/backend';
import {
	ApplicationError,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
export class ClerkGetOrganisation implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Get Organisation',
		name: 'clerkGetOrganisation',
		group: ['transform', 'clerk'],
		icon: 'file:logo.svg',
		version: 1,
		usableAsTool: true,
		description:
			'A custom node in n8n for Clerk.dev allows you to automate interactions with Clerk’s APIs directly within your workflows',
		defaults: {
			name: 'Get organisation',
		},

		credentials: [
			{
				name: 'clerkKeyApi',
				required: true,
			},
		],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Organisation ID',
				name: 'organisationId',
				type: 'string',
				default: '',
				placeholder: '',
				description: 'This should be the signature to verify',
			},
		],
		inputs: [
			{
				type: NodeConnectionType.Main,
				displayName: 'Input',
				category: 'clerk',
				maxConnections: 1, // Limit to one connection for this node
			},
		],
		outputs: [
			{
				type: NodeConnectionType.Main,
				displayName: 'Result',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// const items = this.getInputData();

		const clerkApiKey = await this.getCredentials('clerkKeyApi');
		const organisationId = this.getNodeParameter('organisationId', 0, '') as string;

		let result: INodeExecutionData[] = [];

		try {
			if (!clerkApiKey?.secretkey) {
				throw new ApplicationError('Clerk secret key is required to query clerk.');
			}

			if (!organisationId || organisationId === '') {
				throw new ApplicationError('No organisation ID provided.');
			}

			let client = createClerkClient({
				secretKey: clerkApiKey.secretkey as string,
			});

			const organisation = await client.organizations.getOrganization({
				organizationId: organisationId,
				includeMembersCount: true,
			});
			if (!organisation) {
				throw new ApplicationError(`Organisation with ID ${organisationId} not found.`);
			}
			result.push({
				json: JSON.parse(JSON.stringify(organisation)),
			});
		} catch (error) {
			result.push({
				json: {
					error: error.message || 'An error occurred during user retrieval',
				},
				index: 2, // Set index to 2 for error output
			});
		}
		return this.prepareOutputData(result);
	}
}
