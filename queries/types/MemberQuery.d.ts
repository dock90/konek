/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MemberQuery
// ====================================================

export interface MemberQuery_member_picture {
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

export interface MemberQuery_member_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface MemberQuery_member_profile {
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
}

export interface MemberQuery_member_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
}

export interface MemberQuery_member {
  __typename: "Member";
  /**
   * Name of contact to show in the chat UI. If the current user has permission to view the contact, the contact's name will be shown. If the member is an anonymous member, a random name will be shown otherwise the member's profile name.
   */
  name: string;
  /**
   * Unique ID of member inside the group.
   */
  memberId: string;
  picture: MemberQuery_member_picture | null;
  /**
   * Role is only defined in groups.
   */
  role: MemberQuery_member_role | null;
  profile: MemberQuery_member_profile | null;
  /**
   * Preferred contact for DMs and group contact in groups.
   */
  contact: MemberQuery_member_contact | null;
}

export interface MemberQuery {
  member: MemberQuery_member;
}

export interface MemberQueryVariables {
  memberId: string;
  roomId: string;
}
