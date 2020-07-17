/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagAccessType } from "./Global";

// ====================================================
// GraphQL query operation: ConversationQuery
// ====================================================

export interface ConversationQuery_entry_Note_tags {
  __typename: "Tag";
  tagId: string;
  name: string;
  /**
   * Color of the tag in the UI.
   */
  color: string;
  /**
   * If the tag should be unavailable for adding to an entity. (It may still exist where previously used.)
   */
  hidden: boolean;
  access: TagAccessType;
  /**
   * If I own the current tag and can therefore toggle the access or not.
   */
  isMine: boolean;
}

export interface ConversationQuery_entry_Note {
  entryId: string;
  __typename: "Note";
  tags: ConversationQuery_entry_Note_tags[];
}

export interface ConversationQuery_entry_Conversation_tags {
  __typename: "Tag";
  tagId: string;
  name: string;
  /**
   * Color of the tag in the UI.
   */
  color: string;
  /**
   * If the tag should be unavailable for adding to an entity. (It may still exist where previously used.)
   */
  hidden: boolean;
  access: TagAccessType;
  /**
   * If I own the current tag and can therefore toggle the access or not.
   */
  isMine: boolean;
}

export interface ConversationQuery_entry_Conversation_room_picture {
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

export interface ConversationQuery_entry_Conversation_room {
  __typename: "Room";
  roomId: string;
  /**
   * Name of the room to show in the UI
   */
  name: string;
  qtyUnread: number;
  /**
   * Own member ID in room
   */
  memberId: string;
  /**
   * ID of the last message read.
   */
  readThrough: string | null;
  picture: ConversationQuery_entry_Conversation_room_picture | null;
}

export interface ConversationQuery_entry_Conversation_messages_author_picture {
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

export interface ConversationQuery_entry_Conversation_messages_author_role {
  __typename: "Role";
  roleId: string;
  name: string;
}

export interface ConversationQuery_entry_Conversation_messages_author_profile {
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
}

export interface ConversationQuery_entry_Conversation_messages_author_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
}

export interface ConversationQuery_entry_Conversation_messages_author {
  __typename: "Member";
  /**
   * Name of contact to show in the chat UI. If the current user has permission to view the contact, the contact's name will be shown. If the member is an anonymous member, a random name will be shown otherwise the member's profile name.
   */
  name: string;
  /**
   * Unique ID of member inside the group.
   */
  memberId: string;
  picture: ConversationQuery_entry_Conversation_messages_author_picture | null;
  /**
   * Role is only defined in groups.
   */
  role: ConversationQuery_entry_Conversation_messages_author_role | null;
  profile: ConversationQuery_entry_Conversation_messages_author_profile | null;
  /**
   * Preferred contact for DMs and group contact in groups.
   */
  contact: ConversationQuery_entry_Conversation_messages_author_contact | null;
}

export interface ConversationQuery_entry_Conversation_messages_asset {
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

export interface ConversationQuery_entry_Conversation_messages {
  __typename: "Message";
  messageId: string;
  body: string | null;
  createdAt: any;
  author: ConversationQuery_entry_Conversation_messages_author;
  asset: ConversationQuery_entry_Conversation_messages_asset | null;
}

export interface ConversationQuery_entry_Conversation {
  entryId: string;
  __typename: "Conversation";
  tags: ConversationQuery_entry_Conversation_tags[];
  room: ConversationQuery_entry_Conversation_room;
  /**
   * List of messages in the conversation sorted with the most recent first.
   */
  messages: ConversationQuery_entry_Conversation_messages[];
}

export type ConversationQuery_entry = ConversationQuery_entry_Note | ConversationQuery_entry_Conversation;

export interface ConversationQuery {
  entry: ConversationQuery_entry | null;
}

export interface ConversationQueryVariables {
  entryId: string;
}
