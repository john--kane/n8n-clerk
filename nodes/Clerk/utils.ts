import { ApplicationError, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { OAuthProviderList } from './enums';

export async function GetClerkClient(this: IExecuteFunctions) {
	const credentials = (await GetSecretKey.call(this)) as string | undefined;
	if (!credentials) {
		throw new ApplicationError('No credentials got returned!');
	}
	const { createClerkClient } = await import('@clerk/backend');
	return createClerkClient({
		secretKey: credentials,
	});
}
export async function GetSecretKey(this: IExecuteFunctions): Promise<string> {
	const credentials = this.getCredentials('clerkKeyApi');
	if (!credentials) {
		throw new ApplicationError('No credentials got returned!');
	}
	return (await credentials).secretkey as string;
}

export function GetParam<T>(
	this: IExecuteFunctions,
	paramName: string,
	itemIndex: number = 0,
	fallbackValue?: T,
): T | undefined {
	const param = this.getNodeParameter(paramName, itemIndex, fallbackValue) as T | undefined;
	if (param === undefined || param === null) {
		return fallbackValue as T;
	}
	return param as T;
}

export function Ok(data: any) {
	return {
		json: {
			success: true,
			data,
		},
	};
}

export function Failure(error: Error, ef: IExecuteFunctions, errorCode: string = 'UNKNOWN_ERROR') {
	const errorData = {
		success: false,
		error: {
			message: error.message || 'An error occurred while fetching the user',
			details: error.stack || 'No additional details available',
			code: error.stack || errorCode,
			timestamp: new Date().toISOString(),
		},
	};

	if (!ef.continueOnFail()) {
		throw new NodeOperationError(ef.getNode(), error.message, {
			message: errorData.error.message,
			description: errorData.error.details,
		});
	}

	return {
		json: errorData,
		error: errorData,
	};
}

export function GetProviderForString(provider: string): OAuthProviderList | undefined {
	if (Object.values(OAuthProviderList).includes(provider as OAuthProviderList)) {
		return provider as OAuthProviderList;
	}
	return undefined;
}
