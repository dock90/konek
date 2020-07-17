/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: UpdateContactGroup
// ====================================================

export interface UpdateContactGroup_updateContactGroup_picture {
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

export interface UpdateContactGroup_updateContactGroup_tags {
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

export interface UpdateContactGroup_updateContactGroup_profile_picture {
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

export interface UpdateContactGroup_updateContactGroup_profile_emails {
  email: string;
  label: string | null;
}

export interface UpdateContactGroup_updateContactGroup_profile_phones {
  number: string;
  label: string | null;
}

export interface UpdateContactGroup_updateContactGroup_profile_contacts_picture {
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

export interface UpdateContactGroup_updateContactGroup_profile_contacts_tags {
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

export interface UpdateContactGroup_updateContactGroup_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: UpdateContactGroup_updateContactGroup_profile_contacts_picture | null;
  tags: UpdateContactGroup_updateContactGroup_profile_contacts_tags[] | null;
}

export interface UpdateContactGroup_updateContactGroup_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: UpdateContactGroup_updateContactGroup_profile_picture | null;
  emails: UpdateContactGroup_updateContactGroup_profile_emails[] | null;
  phones: UpdateContactGroup_updateContactGroup_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: UpdateContactGroup_updateContactGroup_profile_contacts[];
}

export interface UpdateContactGroup_updateContactGroup_emails {
  email: string;
  label: string | null;
}

export interface UpdateContactGroup_updateContactGroup_phones {
  number: string;
  label: string | null;
}

export interface UpdateContactGroup_updateContactGroup_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface UpdateContactGroup_updateContactGroup_groups_role {
  roleId: string;
}

export interface UpdateContactGroup_updateContactGroup_groups {
  group: UpdateContactGroup_updateContactGroup_groups_group;
  role: UpdateContactGroup_updateContactGroup_groups_role;
}

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Note_tags {
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

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Note_assets_asset {
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

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Note_assets {
  description: string | null;
  asset: UpdateContactGroup_updateContactGroup_pinnedEntries_Note_assets_asset;
}

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: UpdateContactGroup_updateContactGroup_pinnedEntries_Note_createdBy;
  tags: UpdateContactGroup_updateContactGroup_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: UpdateContactGroup_updateContactGroup_pinnedEntries_Note_assets[] | null;
}

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Conversation_tags {
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

export interface UpdateContactGroup_updateContactGroup_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: UpdateContactGroup_updateContactGroup_pinnedEntries_Conversation_createdBy;
  tags: UpdateContactGroup_updateContactGroup_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type UpdateContactGroup_updateContactGroup_pinnedEntries = UpdateContactGroup_updateContactGroup_pinnedEntries_Note | UpdateContactGroup_updateContactGroup_pinnedEntries_Conversation;

export interface UpdateContactGroup_updateContactGroup {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: UpdateContactGroup_updateContactGroup_picture | null;
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
  tags: UpdateContactGroup_updateContactGroup_tags[] | null;
  fbProfile: string | null;
  profile: UpdateContactGroup_updateContactGroup_profile | null;
  emails: UpdateContactGroup_updateContactGroup_emails[];
  phones: UpdateContactGroup_updateContactGroup_phones[];
  groups: UpdateContactGroup_updateContactGroup_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: UpdateContactGroup_updateContactGroup_pinnedEntries[];
}

export interface UpdateContactGroup {
  /**
   * Updates a contact's group membership.
   */
  updateContactGroup: UpdateContactGroup_updateContactGroup;
}

export interface UpdateContactGroupVariables {
  contactId: string;
  groupId: string;
  roleId: string;
}
