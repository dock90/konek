/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EntryAccessType, NoteAssetInput, TagAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: UpdateNoteMutation
// ====================================================

export interface UpdateNoteMutation_updateNote_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface UpdateNoteMutation_updateNote_tags {
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

export interface UpdateNoteMutation_updateNote_assets_asset {
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

export interface UpdateNoteMutation_updateNote_assets {
  description: string | null;
  asset: UpdateNoteMutation_updateNote_assets_asset;
}

export interface UpdateNoteMutation_updateNote {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: UpdateNoteMutation_updateNote_createdBy;
  tags: UpdateNoteMutation_updateNote_tags[];
  message: string;
  assets: UpdateNoteMutation_updateNote_assets[] | null;
  access: EntryAccessType;
}

export interface UpdateNoteMutation {
  updateNote: UpdateNoteMutation_updateNote | null;
}

export interface UpdateNoteMutationVariables {
  entryId: string;
  title?: string | null;
  message?: string | null;
  tags?: string[] | null;
  access?: EntryAccessType | null;
  pinned?: boolean | null;
  assets?: NoteAssetInput[] | null;
}
