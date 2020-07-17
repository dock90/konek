/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL fragment: EntryFields
// ====================================================

export interface EntryFields_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface EntryFields_Note_tags {
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

export interface EntryFields_Note_assets_asset {
  format: string | null;
  publicId: string;
  resourceType: string;
  type: string;
  originalFilename: string | null;
  /**
   * If the asset is audio only. Only applicable to the "video" resource type.
   */
  isAudio: boolean;
}

export interface EntryFields_Note_assets {
  description: string | null;
  asset: EntryFields_Note_assets_asset;
}

export interface EntryFields_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: EntryFields_Note_createdBy;
  tags: EntryFields_Note_tags[];
  message: string;
  assets: EntryFields_Note_assets[] | null;
  access: EntryAccessType;
}

export interface EntryFields_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface EntryFields_Conversation_tags {
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

export interface EntryFields_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: EntryFields_Conversation_createdBy;
  tags: EntryFields_Conversation_tags[];
  startDate: any;
  endDate: any | null;
  access: EntryAccessType;
}

export type EntryFields = EntryFields_Note | EntryFields_Conversation;
