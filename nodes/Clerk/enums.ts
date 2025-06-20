export enum OAuthProviderList {
	Facebook = 'facebook',
	Google = 'google',
	Hubspot = 'hubspot',
	Github = 'github',
	Tiktok = 'tiktok',
	Gitlab = 'gitlab',
	Discord = 'discord',
	Twitter = 'twitter',
	Twitch = 'twitch',
	Linkedin = 'linkedin',
	LinkedinOidc = 'linkedin_oidc',
	Dropbox = 'dropbox',
	Bitbucket = 'bitbucket',
	Microsoft = 'microsoft',
	Notion = 'notion',
	Apple = 'apple',
	X = 'x',
}

export const OrganizationInvitationStatus = {
	Pending: 'pending',
	Accepted: 'accepted',
	Revoked: 'revoked',
	Expired: 'expired',
} as const;
