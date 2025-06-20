import { IExecuteFunctions } from 'n8n-workflow';
import { getOrganization } from './organisation/getOrganisation';
import { getOrganizationList } from './organisation/getOrganisationList';
import { getOrganizationInvitation } from './organisation/getOrganizationInvitation';
import { getOrganizationMembershipList as getOrgOrganizationMembershipList } from './organisation/getOrganizationMembershipList';
import { banUser } from './user/banUser';
import { createUser } from './user/createUser';
import { deleteUser } from './user/deleteUser';
import { disableUserMFA } from './user/disableUserMFA';
import { getCount } from './user/getCount';
import { getOrganizationMembershipList } from './user/getOrganizationMembershipList';
import { getUser } from './user/getUser';
import { getUserList } from './user/getUserList';
import { getUserOauthAccessToken } from './user/getUserOauthAccessToken';
import { lockUser } from './user/lockUser';
import { unBanUser } from './user/unbanUser';
import { unlockUser } from './user/unlockUser';
import { updateUser } from './user/updateUser';
import { verifyPassword } from './user/verifyPassword';

type ResourceOperationFunctions = {
	[resource: string]: {
		[operation: string]: (ef: IExecuteFunctions) => Promise<any>;
	};
};

// este dicionario é utilizado para mapear as operações disponíveis para cada recurso e operação para cada função
export const resourceOperationsFunctions: ResourceOperationFunctions = {
	'users-api': {
		'get-user': getUser,
		'get-user-list': getUserList,
		'get-user-count': getCount,
		'get-organization-membership-list': getOrganizationMembershipList,
		'get-user-oauth-access-token': getUserOauthAccessToken,
		'create-user': createUser,
		'update-user': updateUser,
		'verify-password': verifyPassword,
		'ban-user': banUser,
		'unban-user': unBanUser,
		'lock-user': lockUser,
		'unlock-user': unlockUser,
		'delete-user': deleteUser,
		'disable-user-mfa': disableUserMFA,
	},
	'organization-api': {
		'get-organization': getOrganization,
		'get-organization-list': getOrganizationList,
		'get-organization-invitation': getOrganizationInvitation,
		'get-org-organization-membership-list': getOrgOrganizationMembershipList,
		'get-organization-invitation-list': getOrganizationInvitation,
	},
};
