/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupInvitation
// ====================================================

export interface GroupInvitation_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface GroupInvitation {
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
  role: GroupInvitation_role;
}
