import { IExecuteFunctions } from 'n8n-workflow';
import { createAllowlistIdentifier } from './allowlist/createAllowlistIdentifier';
import { deleteAllowlistIdentifier } from './allowlist/deleteAllowlistIdentifier';
import { getAllowlistIdentifierList } from './allowlist/getAllowlistIdentifierList';
import { deleteDomain } from './domains/deleteDomain';
import { createEmailAddress } from './emailaddresses/createEmailAddress';
import { deleteEmailAddress } from './emailaddresses/deleteEmailAddress';
import { getEmailAddress } from './emailaddresses/getEmailAddress';
import { updateEmailAddress } from './emailaddresses/updateEmailAddress';
import { createInvitation } from './invitations/createInvitation';
import { getInvitationList } from './invitations/getInvitationList';
import { revokeInvitation } from './invitations/revokeInvitation';
import { getOrganization } from './organisation/getOrganisation';
import { getOrganizationList } from './organisation/getOrganisationList';
import { getOrganizationInvitation } from './organisation/getOrganizationInvitation';
import { getOrganizationMembershipList as getOrgOrganizationMembershipList } from './organisation/getOrganizationMembershipList';
import { getSession } from './sessions/getSession';
import { getSessionList } from './sessions/getSessionList';
import { getToken } from './sessions/getToken';
import { revokeSession } from './sessions/revokeSession';
import { verifySession } from './sessions/verifySession';
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
	'allowlist-api': {
		'get-allowlist-identifier-list': getAllowlistIdentifierList,
		'create-allowlist-identifier': createAllowlistIdentifier,
		'delete-allowlist-identifier': deleteAllowlistIdentifier,
	},
	'domain-api': {
		'delete-domain': deleteDomain,
	},
	'session-api': {
		'get-session': getSession,
		'get-session-list': getSessionList,
		'get-token': getToken,
		'verify-session': verifySession,
		'revoke-session': revokeSession,
	},
	'invitation-api': {
		'get-invitation-list': getInvitationList,
		'create-invitation': createInvitation,
		'revoke-invitation': revokeInvitation,
	},
	'emailaddresses-api': {
		'get-email-address': getEmailAddress,
		'create-email-address': createEmailAddress,
		'delete-email-address': deleteEmailAddress,
		'update-email-address': updateEmailAddress,
	},
};
