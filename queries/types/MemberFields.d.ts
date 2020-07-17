/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MemberFields
// ====================================================

export interface MemberFields_picture {
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

export interface MemberFields_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface MemberFields_profile {
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
}

export interface MemberFields_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
}

export interface MemberFields {
  __typename: "Member";
  /**
   * Name of contact to show in the chat UI. If the current user has permission to view the contact, the contact's name will be shown. If the member is an anonymous member, a random name will be shown otherwise the member's profile name.
   */
  name: string;
  /**
   * Unique ID of member inside the group.
   */
  memberId: string;
  picture: MemberFields_picture | null;
  /**
   * Role is only defined in groups.
   */
  role: MemberFields_role | null;
  profile: MemberFields_profile | null;
  /**
   * Preferred contact for DMs and group contact in groups.
   */
  contact: MemberFields_contact | null;
}
