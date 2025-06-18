import { createClerkClient } from '@clerk/backend';
import {
	ApplicationError,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
export class ClerkGetInvitations implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Get Invitations',
		name: 'clerkGetInvitations',
		group: ['transform', 'clerk'],
		icon: 'file:logo.svg',
		version: 1,
		usableAsTool: true,

		description:
			'A custom node in n8n for Clerk.dev allows you to automate interactions with Clerk’s APIs directly within your workflows',
		defaults: {
			name: 'Get invitations',
		},

		credentials: [
			{
				name: 'clerkKeyApi',
				required: true,
			},
		],
		properties: [],
		inputs: [
			{
				type: NodeConnectionType.Main,
				displayName: 'Input',
				category: 'clerk',
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

		let result: INodeExecutionData[] = [];

		try {
			if (!clerkApiKey?.secretkey) {
				throw new ApplicationError('Clerk secret key is required to query clerk.');
			}

			let client = createClerkClient({
				secretKey: clerkApiKey.secretkey as string,
			});

			const list = await client.invitations.getInvitationList({});
			if (!list) {
				throw new ApplicationError(`No invitations found.`);
			}
			result.push({
				json: JSON.parse(JSON.stringify(list)),
			});
		} catch (error) {
			result.push({
				json: {
					error: error.message || 'An error occurred during list retrieval',
				},
				index: 2, // Set index to 2 for error output
			});
		}
		return this.prepareOutputData(result);
	}
}
