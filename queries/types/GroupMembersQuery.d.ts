/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupMembersQuery
// ====================================================

export interface GroupMembersQuery_group_defaultRole {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupMembersQuery_group_ancestors {
  groupId: string;
}

export interface GroupMembersQuery_group_picture {
  __typename: "Asset";
  format: string | null;
  publicId: string;
  resourceType: string;
  type: string;
  /**
   * If the asset is audio only. Only applicable to the "video" resource type.
   */
  isAudio: boolean;
}

export interface GroupMembersQuery_group_invitations_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupMembersQuery_group_invitations {
  __typename: "GroupInvitation";
  groupInvitationId: string;
  /**
   * The code the user will use.
   */
  code: string;
  /**
   * Admin-visible description of the invitation code's purpose
   */
  description: string | null;
  active: boolean;
  role: GroupMembersQuery_group_invitations_role;
}

export interface GroupMembersQuery_group_members_picture {
  __typename: "Asset";
  format: string | null;
  publicId: string;
  resourceType: string;
  type: string;
  /**
   * If the asset is audio only. Only applicable to the "video" resource type.
   */
  isAudio: boolean;
}

export interface GroupMembersQuery_group_members_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupMembersQuery_group_members_profile {
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
}

export interface GroupMembersQuery_group_members_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
}

export interface GroupMembersQuery_group_members {
  __typename: "Member";
  /**
   * Name of contact to show in the chat UI. If the current user has permission to view the contact, the contact's name will be shown. If the member is an anonymous member, a random name will be shown otherwise the member's profile name.
   */
  name: string;
  /**
   * Unique ID of member inside the group.
   */
  memberId: string;
  picture: GroupMembersQuery_group_members_picture | null;
  /**
   * Role is only defined in groups.
   */
  role: GroupMembersQuery_group_members_role | null;
  profile: GroupMembersQuery_group_members_profile | null;
  /**
   * Preferred contact for DMs and group contact in groups.
   */
  contact: GroupMembersQuery_group_members_contact | null;
}

export interface GroupMembersQuery_group {
  __typename: "Group";
  groupId: string;
  name: string;
  description: string | null;
  roomId: string;
  /**
   * If the current profile has permission to manage the group.
   */
  canManage: boolean;
  /**
   * Default role for new members of this group.
   */
  defaultRole: GroupMembersQuery_group_defaultRole | null;
  /**
   * List of ancestor groups.
   */
  ancestors: GroupMembersQuery_group_ancestors[] | null;
  picture: GroupMembersQuery_group_picture | null;
  /**
   * Group invitation codes created for this groups.
   */
  invitations: GroupMembersQuery_group_invitations[];
  members: GroupMembersQuery_group_members[];
}

export interface GroupMembersQuery {
  group: GroupMembersQuery_group;
}

export interface GroupMembersQueryVariables {
  groupId: string;
}
