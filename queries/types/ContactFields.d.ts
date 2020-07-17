/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL fragment: ContactFields
// ====================================================

export interface ContactFields_picture {
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

export interface ContactFields_tags {
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

export interface ContactFields_profile_picture {
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

export interface ContactFields_profile_emails {
  email: string;
  label: string | null;
}

export interface ContactFields_profile_phones {
  number: string;
  label: string | null;
}

export interface ContactFields_profile_contacts_picture {
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

export interface ContactFields_profile_contacts_tags {
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

export interface ContactFields_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: ContactFields_profile_contacts_picture | null;
  tags: ContactFields_profile_contacts_tags[] | null;
}

export interface ContactFields_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: ContactFields_profile_picture | null;
  emails: ContactFields_profile_emails[] | null;
  phones: ContactFields_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: ContactFields_profile_contacts[];
}

export interface ContactFields_emails {
  email: string;
  label: string | null;
}

export interface ContactFields_phones {
  number: string;
  label: string | null;
}

export interface ContactFields_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface ContactFields_groups_role {
  roleId: string;
}

export interface ContactFields_groups {
  group: ContactFields_groups_group;
  role: ContactFields_groups_role;
}

export interface ContactFields_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface ContactFields_pinnedEntries_Note_tags {
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

export interface ContactFields_pinnedEntries_Note_assets_asset {
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

export interface ContactFields_pinnedEntries_Note_assets {
  description: string | null;
  asset: ContactFields_pinnedEntries_Note_assets_asset;
}

export interface ContactFields_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: ContactFields_pinnedEntries_Note_createdBy;
  tags: ContactFields_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: ContactFields_pinnedEntries_Note_assets[] | null;
}

export interface ContactFields_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface ContactFields_pinnedEntries_Conversation_tags {
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

export interface ContactFields_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: ContactFields_pinnedEntries_Conversation_createdBy;
  tags: ContactFields_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type ContactFields_pinnedEntries = ContactFields_pinnedEntries_Note | ContactFields_pinnedEntries_Conversation;

export interface ContactFields {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: ContactFields_picture | null;
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
  tags: ContactFields_tags[] | null;
  fbProfile: string | null;
  profile: ContactFields_profile | null;
  emails: ContactFields_emails[];
  phones: ContactFields_phones[];
  groups: ContactFields_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: ContactFields_pinnedEntries[];
}
