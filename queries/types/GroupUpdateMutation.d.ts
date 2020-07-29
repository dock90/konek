/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetInput } from "./Global";

// ====================================================
// GraphQL mutation operation: GroupUpdateMutation
// ====================================================

export interface GroupUpdateMutation_updateGroup_defaultRole {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupUpdateMutation_updateGroup_ancestors {
  groupId: string;
}

export interface GroupUpdateMutation_updateGroup_picture {
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

export interface GroupUpdateMutation_updateGroup_invitations_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupUpdateMutation_updateGroup_invitations {
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
  role: GroupUpdateMutation_updateGroup_invitations_role;
}

export interface GroupUpdateMutation_updateGroup {
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
  defaultRole: GroupUpdateMutation_updateGroup_defaultRole | null;
  /**
   * List of ancestor groups.
   */
  ancestors: GroupUpdateMutation_updateGroup_ancestors[] | null;
  picture: GroupUpdateMutation_updateGroup_picture | null;
  /**
   * Group invitation codes created for this groups.
   */
  invitations: GroupUpdateMutation_updateGroup_invitations[];
}

export interface GroupUpdateMutation {
  updateGroup: GroupUpdateMutation_updateGroup | null;
}

export interface GroupUpdateMutationVariables {
  groupId: string;
  name?: string | null;
  description?: string | null;
  defaultRoleId?: string | null;
  parentGroupId?: string | null;
  picture?: AssetInput | null;
}
