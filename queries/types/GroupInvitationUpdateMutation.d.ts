/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GroupInvitationUpdateMutation
// ====================================================

export interface GroupInvitationUpdateMutation_updateGroupInvitation_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupInvitationUpdateMutation_updateGroupInvitation {
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
  role: GroupInvitationUpdateMutation_updateGroupInvitation_role;
}

export interface GroupInvitationUpdateMutation {
  updateGroupInvitation: GroupInvitationUpdateMutation_updateGroupInvitation;
}

export interface GroupInvitationUpdateMutationVariables {
  id: string;
  roleId?: string | null;
  code?: string | null;
  description?: string | null;
  active?: boolean | null;
}
