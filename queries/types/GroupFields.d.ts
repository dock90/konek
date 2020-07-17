/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupFields
// ====================================================

export interface GroupFields_defaultRole {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupFields_ancestors {
  groupId: string;
}

export interface GroupFields_picture {
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

export interface GroupFields {
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
  defaultRole: GroupFields_defaultRole | null;
  /**
   * List of ancestor groups.
   */
  ancestors: GroupFields_ancestors[] | null;
  picture: GroupFields_picture | null;
}
