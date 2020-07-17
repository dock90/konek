/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: RemoveContactGroup
// ====================================================

export interface RemoveContactGroup_removeContactGroup_picture {
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

export interface RemoveContactGroup_removeContactGroup_tags {
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

export interface RemoveContactGroup_removeContactGroup_profile_picture {
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

export interface RemoveContactGroup_removeContactGroup_profile_emails {
  email: string;
  label: string | null;
}

export interface RemoveContactGroup_removeContactGroup_profile_phones {
  number: string;
  label: string | null;
}

export interface RemoveContactGroup_removeContactGroup_profile_contacts_picture {
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

export interface RemoveContactGroup_removeContactGroup_profile_contacts_tags {
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

export interface RemoveContactGroup_removeContactGroup_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: RemoveContactGroup_removeContactGroup_profile_contacts_picture | null;
  tags: RemoveContactGroup_removeContactGroup_profile_contacts_tags[] | null;
}

export interface RemoveContactGroup_removeContactGroup_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: RemoveContactGroup_removeContactGroup_profile_picture | null;
  emails: RemoveContactGroup_removeContactGroup_profile_emails[] | null;
  phones: RemoveContactGroup_removeContactGroup_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: RemoveContactGroup_removeContactGroup_profile_contacts[];
}

export interface RemoveContactGroup_removeContactGroup_emails {
  email: string;
  label: string | null;
}

export interface RemoveContactGroup_removeContactGroup_phones {
  number: string;
  label: string | null;
}

export interface RemoveContactGroup_removeContactGroup_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface RemoveContactGroup_removeContactGroup_groups_role {
  roleId: string;
}

export interface RemoveContactGroup_removeContactGroup_groups {
  group: RemoveContactGroup_removeContactGroup_groups_group;
  role: RemoveContactGroup_removeContactGroup_groups_role;
}

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Note_tags {
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

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Note_assets_asset {
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

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Note_assets {
  description: string | null;
  asset: RemoveContactGroup_removeContactGroup_pinnedEntries_Note_assets_asset;
}

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: RemoveContactGroup_removeContactGroup_pinnedEntries_Note_createdBy;
  tags: RemoveContactGroup_removeContactGroup_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: RemoveContactGroup_removeContactGroup_pinnedEntries_Note_assets[] | null;
}

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Conversation_tags {
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

export interface RemoveContactGroup_removeContactGroup_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: RemoveContactGroup_removeContactGroup_pinnedEntries_Conversation_createdBy;
  tags: RemoveContactGroup_removeContactGroup_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type RemoveContactGroup_removeContactGroup_pinnedEntries = RemoveContactGroup_removeContactGroup_pinnedEntries_Note | RemoveContactGroup_removeContactGroup_pinnedEntries_Conversation;

export interface RemoveContactGroup_removeContactGroup {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: RemoveContactGroup_removeContactGroup_picture | null;
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
  tags: RemoveContactGroup_removeContactGroup_tags[] | null;
  fbProfile: string | null;
  profile: RemoveContactGroup_removeContactGroup_profile | null;
  emails: RemoveContactGroup_removeContactGroup_emails[];
  phones: RemoveContactGroup_removeContactGroup_phones[];
  groups: RemoveContactGroup_removeContactGroup_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: RemoveContactGroup_removeContactGroup_pinnedEntries[];
}

export interface RemoveContactGroup {
  /**
   * Removes a group from a contact.
   */
  removeContactGroup: RemoveContactGroup_removeContactGroup | null;
}

export interface RemoveContactGroupVariables {
  contactId: string;
  groupId: string;
}
