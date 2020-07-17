/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagAccessType } from "./Global";

// ====================================================
// GraphQL query operation: AllContactsQuery
// ====================================================

export interface AllContactsQuery_contacts_data_picture {
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

export interface AllContactsQuery_contacts_data_tags {
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

export interface AllContactsQuery_contacts_data {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: AllContactsQuery_contacts_data_picture | null;
  tags: AllContactsQuery_contacts_data_tags[] | null;
}

export interface AllContactsQuery_contacts_pageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface AllContactsQuery_contacts {
  data: AllContactsQuery_contacts_data[];
  pageInfo: AllContactsQuery_contacts_pageInfo;
}

export interface AllContactsQuery {
  /**
   * All available contacts
   */
  contacts: AllContactsQuery_contacts;
}

export interface AllContactsQueryVariables {
  tags?: string[] | null;
}
