import { createClerkClient } from '@clerk/backend';
import {
	ApplicationError,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
export class ClerkGetUsers implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Get Users',
		name: 'clerkGetUsers',
		group: ['transform', 'clerk'],
		icon: 'file:logo.svg',
		version: 1,
		usableAsTool: true,

		description:
			'A custom node in n8n for Clerk.dev allows you to automate interactions with Clerk’s APIs directly within your workflows',
		defaults: {
			name: 'Get users',
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
				displayName: 'User ID',
				name: 'userId',
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
		const userId = this.getNodeParameter('userId', 0, '') as string;

		let result: INodeExecutionData[] = [];

		try {
			if (!clerkApiKey?.secretkey) {
				throw new ApplicationError('Clerk secret key is required to verify the signature.');
			}

			if (!userId || userId === '') {
				throw new ApplicationError('No user ID provided.');
			}

			let client = createClerkClient({
				secretKey: clerkApiKey.secretkey as string,
			});

			const user = await client.users.getUser(userId);
			if (!user) {
				throw new ApplicationError(`User with ID ${userId} not found.`);
			}
			result.push({
				json: JSON.parse(JSON.stringify(user)),
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
