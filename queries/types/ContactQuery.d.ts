/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL query operation: ContactQuery
// ====================================================

export interface ContactQuery_contact_picture {
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

export interface ContactQuery_contact_tags {
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

export interface ContactQuery_contact_profile_picture {
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

export interface ContactQuery_contact_profile_emails {
  email: string;
  label: string | null;
}

export interface ContactQuery_contact_profile_phones {
  number: string;
  label: string | null;
}

export interface ContactQuery_contact_profile_contacts_picture {
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

export interface ContactQuery_contact_profile_contacts_tags {
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

export interface ContactQuery_contact_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: ContactQuery_contact_profile_contacts_picture | null;
  tags: ContactQuery_contact_profile_contacts_tags[] | null;
}

export interface ContactQuery_contact_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: ContactQuery_contact_profile_picture | null;
  emails: ContactQuery_contact_profile_emails[] | null;
  phones: ContactQuery_contact_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: ContactQuery_contact_profile_contacts[];
}

export interface ContactQuery_contact_emails {
  email: string;
  label: string | null;
}

export interface ContactQuery_contact_phones {
  number: string;
  label: string | null;
}

export interface ContactQuery_contact_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface ContactQuery_contact_groups_role {
  roleId: string;
}

export interface ContactQuery_contact_groups {
  group: ContactQuery_contact_groups_group;
  role: ContactQuery_contact_groups_role;
}

export interface ContactQuery_contact_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface ContactQuery_contact_pinnedEntries_Note_tags {
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

export interface ContactQuery_contact_pinnedEntries_Note_assets_asset {
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

export interface ContactQuery_contact_pinnedEntries_Note_assets {
  description: string | null;
  asset: ContactQuery_contact_pinnedEntries_Note_assets_asset;
}

export interface ContactQuery_contact_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: ContactQuery_contact_pinnedEntries_Note_createdBy;
  tags: ContactQuery_contact_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: ContactQuery_contact_pinnedEntries_Note_assets[] | null;
}

export interface ContactQuery_contact_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface ContactQuery_contact_pinnedEntries_Conversation_tags {
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

export interface ContactQuery_contact_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: ContactQuery_contact_pinnedEntries_Conversation_createdBy;
  tags: ContactQuery_contact_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type ContactQuery_contact_pinnedEntries = ContactQuery_contact_pinnedEntries_Note | ContactQuery_contact_pinnedEntries_Conversation;

export interface ContactQuery_contact {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: ContactQuery_contact_picture | null;
  /**
   * Folder where all contact specific assets should be stored. (This includes note assets.)
   */
  assetFolderId: string;
  /**
   * A brief description of the contact for quick reference.
   */
  bio: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  gender: Gender | null;
  language: string | null;
  invitationCode: string | null;
  tags: ContactQuery_contact_tags[] | null;
  fbProfile: string | null;
  profile: ContactQuery_contact_profile | null;
  emails: ContactQuery_contact_emails[];
  phones: ContactQuery_contact_phones[];
  groups: ContactQuery_contact_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: ContactQuery_contact_pinnedEntries[];
}

export interface ContactQuery {
  /**
   * Load a single contact
   */
  contact: ContactQuery_contact | null;
}

export interface ContactQueryVariables {
  contactId: string;
}
