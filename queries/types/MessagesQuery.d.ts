/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessagesQuery
// ====================================================

export interface MessagesQuery_messages_data_author_picture {
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

export interface MessagesQuery_messages_data_author_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface MessagesQuery_messages_data_author_profile {
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
}

export interface MessagesQuery_messages_data_author_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
}

export interface MessagesQuery_messages_data_author {
  __typename: "Member";
  /**
   * Name of contact to show in the chat UI. If the current user has permission to view the contact, the contact's name will be shown. If the member is an anonymous member, a random name will be shown otherwise the member's profile name.
   */
  name: string;
  /**
   * Unique ID of member inside the group.
   */
  memberId: string;
  picture: MessagesQuery_messages_data_author_picture | null;
  /**
   * Role is only defined in groups.
   */
  role: MessagesQuery_messages_data_author_role | null;
  profile: MessagesQuery_messages_data_author_profile | null;
  /**
   * Preferred contact for DMs and group contact in groups.
   */
  contact: MessagesQuery_messages_data_author_contact | null;
}

export interface MessagesQuery_messages_data_asset {
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

export interface MessagesQuery_messages_data {
  __typename: "Message";
  messageId: string;
  body: string | null;
  createdAt: any;
  author: MessagesQuery_messages_data_author;
  asset: MessagesQuery_messages_data_asset | null;
}

export interface MessagesQuery_messages_pageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface MessagesQuery_messages {
  data: MessagesQuery_messages_data[];
  pageInfo: MessagesQuery_messages_pageInfo;
}

export interface MessagesQuery {
  /**
   * List of messages sorted in descending order so the most recent messages are first.
   */
  messages: MessagesQuery_messages;
}

export interface MessagesQueryVariables {
  roomId: string;
  after?: string | null;
}
