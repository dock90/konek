/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntryTypes, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL query operation: EntriesQuery
// ====================================================

export interface EntriesQuery_entries_data_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface EntriesQuery_entries_data_Note_tags {
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

export interface EntriesQuery_entries_data_Note_assets_asset {
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

export interface EntriesQuery_entries_data_Note_assets {
  description: string | null;
  asset: EntriesQuery_entries_data_Note_assets_asset;
}

export interface EntriesQuery_entries_data_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: EntriesQuery_entries_data_Note_createdBy;
  tags: EntriesQuery_entries_data_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: EntriesQuery_entries_data_Note_assets[] | null;
}

export interface EntriesQuery_entries_data_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface EntriesQuery_entries_data_Conversation_tags {
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

export interface EntriesQuery_entries_data_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: EntriesQuery_entries_data_Conversation_createdBy;
  tags: EntriesQuery_entries_data_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type EntriesQuery_entries_data = EntriesQuery_entries_data_Note | EntriesQuery_entries_data_Conversation;

export interface EntriesQuery_entries_pageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface EntriesQuery_entries {
  data: EntriesQuery_entries_data[];
  pageInfo: EntriesQuery_entries_pageInfo;
}

export interface EntriesQuery {
  entries: EntriesQuery_entries;
}

export interface EntriesQueryVariables {
  contactId: string;
  type?: EntryTypes | null;
}
