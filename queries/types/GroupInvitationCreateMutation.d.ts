/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GroupInvitationCreateMutation
// ====================================================

export interface GroupInvitationCreateMutation_createGroupInvitation_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupInvitationCreateMutation_createGroupInvitation {
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
  role: GroupInvitationCreateMutation_createGroupInvitation_role;
}

export interface GroupInvitationCreateMutation {
  /**
   * Creates a new invitation code.
   */
  createGroupInvitation: GroupInvitationCreateMutation_createGroupInvitation;
}

export interface GroupInvitationCreateMutationVariables {
  code: string;
  groupId: string;
  roleId: string;
  description?: string | null;
  active?: boolean | null;
}
