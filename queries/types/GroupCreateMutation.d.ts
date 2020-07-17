/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetInput } from "./Global";

// ====================================================
// GraphQL mutation operation: GroupCreateMutation
// ====================================================

export interface GroupCreateMutation_createGroup_defaultRole {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupCreateMutation_createGroup_ancestors {
  groupId: string;
}

export interface GroupCreateMutation_createGroup_picture {
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

export interface GroupCreateMutation_createGroup {
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
  defaultRole: GroupCreateMutation_createGroup_defaultRole | null;
  /**
   * List of ancestor groups.
   */
  ancestors: GroupCreateMutation_createGroup_ancestors[] | null;
  picture: GroupCreateMutation_createGroup_picture | null;
}

export interface GroupCreateMutation {
  /**
   * Creates a new Group.
   */
  createGroup: GroupCreateMutation_createGroup | null;
}

export interface GroupCreateMutationVariables {
  name: string;
  description?: string | null;
  defaultRoleId: string;
  parentGroupId: string;
  picture?: AssetInput | null;
}
