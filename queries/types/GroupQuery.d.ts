/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupQuery
// ====================================================

export interface GroupQuery_group_defaultRole {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupQuery_group_ancestors {
  groupId: string;
}

export interface GroupQuery_group_picture {
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

export interface GroupQuery_group_invitations_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupQuery_group_invitations {
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
  role: GroupQuery_group_invitations_role;
}

export interface GroupQuery_group {
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
  defaultRole: GroupQuery_group_defaultRole | null;
  /**
   * List of ancestor groups.
   */
  ancestors: GroupQuery_group_ancestors[] | null;
  picture: GroupQuery_group_picture | null;
  /**
   * Group invitation codes created for this groups.
   */
  invitations: GroupQuery_group_invitations[];
}

export interface GroupQuery {
  group: GroupQuery_group;
}

export interface GroupQueryVariables {
  groupId: string;
}
