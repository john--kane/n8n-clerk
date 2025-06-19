import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeApiError,
} from 'n8n-workflow';
import { resourceOperationsFunctions } from './execute/index';
import { clerkNodeProperties } from './properties/index';

export class ClerkApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Clerk',
		subtitle: '={{$parameter["operation"]}}',
		name: 'clerkApi',
		group: ['transform'],
		icon: 'file:logo.svg',
		version: 1,
		usableAsTool: true,
		description:
			'A custom node in n8n for Clerk.dev allows you to automate interactions with Clerk’s APIs directly within your workflows',
		defaults: {
			name: 'Clerk API',
		},

		credentials: [
			{
				name: 'clerkKeyApi',
				required: true,
			},
		],
		properties: clerkNodeProperties,
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const fn = resourceOperationsFunctions[resource][operation];

		if (!fn) {
			throw new NodeApiError(this.getNode(), {
				message: 'Operation not supported',
				description: `The function "${operation}" for the resource "${resource}" is not supported!`,
			});
		}

		// Execute the function
		const responseData = await fn(this);

		// Return only the JSON
		return [this.helpers.returnJsonArray(responseData)];
	}
}
