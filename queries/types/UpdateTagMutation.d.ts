/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: UpdateTagMutation
// ====================================================

export interface UpdateTagMutation_updateTag {
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

export interface UpdateTagMutation {
  /**
   * Updates an existing tag.
   */
  updateTag: UpdateTagMutation_updateTag | null;
}

export interface UpdateTagMutationVariables {
  tagId: string;
  name?: string | null;
  color?: string | null;
  hidden?: boolean | null;
  access?: TagAccessType | null;
}
