/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupsQuery
// ====================================================

export interface GroupsQuery_groups_defaultRole {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupsQuery_groups_ancestors {
  groupId: string;
}

export interface GroupsQuery_groups_picture {
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

export interface GroupsQuery_groups_invitations_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupsQuery_groups_invitations {
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
  role: GroupsQuery_groups_invitations_role;
}

export interface GroupsQuery_groups {
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
  defaultRole: GroupsQuery_groups_defaultRole | null;
  /**
   * List of ancestor groups.
   */
  ancestors: GroupsQuery_groups_ancestors[] | null;
  picture: GroupsQuery_groups_picture | null;
  /**
   * Group invitation codes created for this groups.
   */
  invitations: GroupsQuery_groups_invitations[];
}

export interface GroupsQuery {
  groups: GroupsQuery_groups[];
}
