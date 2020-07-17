/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageFields
// ====================================================

export interface MessageFields_author_picture {
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

export interface MessageFields_author_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface MessageFields_author_profile {
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
}

export interface MessageFields_author_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
}

export interface MessageFields_author {
  __typename: "Member";
  /**
   * Name of contact to show in the chat UI. If the current user has permission to view the contact, the contact's name will be shown. If the member is an anonymous member, a random name will be shown otherwise the member's profile name.
   */
  name: string;
  /**
   * Unique ID of member inside the group.
   */
  memberId: string;
  picture: MessageFields_author_picture | null;
  /**
   * Role is only defined in groups.
   */
  role: MessageFields_author_role | null;
  profile: MessageFields_author_profile | null;
  /**
   * Preferred contact for DMs and group contact in groups.
   */
  contact: MessageFields_author_contact | null;
}

export interface MessageFields_asset {
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

export interface MessageFields {
  __typename: "Message";
  messageId: string;
  body: string | null;
  createdAt: any;
  author: MessageFields_author;
  asset: MessageFields_asset | null;
}
