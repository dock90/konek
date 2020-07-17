/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntryAccessType, NoteAssetInput, TagAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: CreateNoteMutation
// ====================================================

export interface CreateNoteMutation_createNote_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface CreateNoteMutation_createNote_tags {
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

export interface CreateNoteMutation_createNote_assets_asset {
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

export interface CreateNoteMutation_createNote_assets {
  description: string | null;
  asset: CreateNoteMutation_createNote_assets_asset;
}

export interface CreateNoteMutation_createNote {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: CreateNoteMutation_createNote_createdBy;
  tags: CreateNoteMutation_createNote_tags[];
  message: string;
  assets: CreateNoteMutation_createNote_assets[] | null;
  access: EntryAccessType;
}

export interface CreateNoteMutation {
  createNote: CreateNoteMutation_createNote;
}

export interface CreateNoteMutationVariables {
  contactId: string;
  title: string;
  message: string;
  tags?: string[] | null;
  access?: EntryAccessType | null;
  pinned?: boolean | null;
  assets?: NoteAssetInput[] | null;
}
