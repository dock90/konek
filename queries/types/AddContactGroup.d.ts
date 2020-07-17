/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: AddContactGroup
// ====================================================

export interface AddContactGroup_addContactGroup_picture {
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

export interface AddContactGroup_addContactGroup_tags {
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

export interface AddContactGroup_addContactGroup_profile_picture {
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

export interface AddContactGroup_addContactGroup_profile_emails {
  email: string;
  label: string | null;
}

export interface AddContactGroup_addContactGroup_profile_phones {
  number: string;
  label: string | null;
}

export interface AddContactGroup_addContactGroup_profile_contacts_picture {
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

export interface AddContactGroup_addContactGroup_profile_contacts_tags {
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

export interface AddContactGroup_addContactGroup_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: AddContactGroup_addContactGroup_profile_contacts_picture | null;
  tags: AddContactGroup_addContactGroup_profile_contacts_tags[] | null;
}

export interface AddContactGroup_addContactGroup_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: AddContactGroup_addContactGroup_profile_picture | null;
  emails: AddContactGroup_addContactGroup_profile_emails[] | null;
  phones: AddContactGroup_addContactGroup_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: AddContactGroup_addContactGroup_profile_contacts[];
}

export interface AddContactGroup_addContactGroup_emails {
  email: string;
  label: string | null;
}

export interface AddContactGroup_addContactGroup_phones {
  number: string;
  label: string | null;
}

export interface AddContactGroup_addContactGroup_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface AddContactGroup_addContactGroup_groups_role {
  roleId: string;
}

export interface AddContactGroup_addContactGroup_groups {
  group: AddContactGroup_addContactGroup_groups_group;
  role: AddContactGroup_addContactGroup_groups_role;
}

export interface AddContactGroup_addContactGroup_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface AddContactGroup_addContactGroup_pinnedEntries_Note_tags {
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

export interface AddContactGroup_addContactGroup_pinnedEntries_Note_assets_asset {
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

export interface AddContactGroup_addContactGroup_pinnedEntries_Note_assets {
  description: string | null;
  asset: AddContactGroup_addContactGroup_pinnedEntries_Note_assets_asset;
}

export interface AddContactGroup_addContactGroup_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: AddContactGroup_addContactGroup_pinnedEntries_Note_createdBy;
  tags: AddContactGroup_addContactGroup_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: AddContactGroup_addContactGroup_pinnedEntries_Note_assets[] | null;
}

export interface AddContactGroup_addContactGroup_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface AddContactGroup_addContactGroup_pinnedEntries_Conversation_tags {
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

export interface AddContactGroup_addContactGroup_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: AddContactGroup_addContactGroup_pinnedEntries_Conversation_createdBy;
  tags: AddContactGroup_addContactGroup_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type AddContactGroup_addContactGroup_pinnedEntries = AddContactGroup_addContactGroup_pinnedEntries_Note | AddContactGroup_addContactGroup_pinnedEntries_Conversation;

export interface AddContactGroup_addContactGroup {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: AddContactGroup_addContactGroup_picture | null;
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
  tags: AddContactGroup_addContactGroup_tags[] | null;
  fbProfile: string | null;
  profile: AddContactGroup_addContactGroup_profile | null;
  emails: AddContactGroup_addContactGroup_emails[];
  phones: AddContactGroup_addContactGroup_phones[];
  groups: AddContactGroup_addContactGroup_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: AddContactGroup_addContactGroup_pinnedEntries[];
}

export interface AddContactGroup {
  /**
   * Adds a group to a contact
   */
  addContactGroup: AddContactGroup_addContactGroup | null;
}

export interface AddContactGroupVariables {
  contactId: string;
  groupId: string;
  roleId: string;
}
