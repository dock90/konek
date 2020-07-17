/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PhoneInput, EmailInput, AssetInput, Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: UpdateContactMutation
// ====================================================

export interface UpdateContactMutation_updateContact_picture {
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

export interface UpdateContactMutation_updateContact_tags {
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

export interface UpdateContactMutation_updateContact_profile_picture {
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

export interface UpdateContactMutation_updateContact_profile_emails {
  email: string;
  label: string | null;
}

export interface UpdateContactMutation_updateContact_profile_phones {
  number: string;
  label: string | null;
}

export interface UpdateContactMutation_updateContact_profile_contacts_picture {
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

export interface UpdateContactMutation_updateContact_profile_contacts_tags {
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

export interface UpdateContactMutation_updateContact_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: UpdateContactMutation_updateContact_profile_contacts_picture | null;
  tags: UpdateContactMutation_updateContact_profile_contacts_tags[] | null;
}

export interface UpdateContactMutation_updateContact_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: UpdateContactMutation_updateContact_profile_picture | null;
  emails: UpdateContactMutation_updateContact_profile_emails[] | null;
  phones: UpdateContactMutation_updateContact_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: UpdateContactMutation_updateContact_profile_contacts[];
}

export interface UpdateContactMutation_updateContact_emails {
  email: string;
  label: string | null;
}

export interface UpdateContactMutation_updateContact_phones {
  number: string;
  label: string | null;
}

export interface UpdateContactMutation_updateContact_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface UpdateContactMutation_updateContact_groups_role {
  roleId: string;
}

export interface UpdateContactMutation_updateContact_groups {
  group: UpdateContactMutation_updateContact_groups_group;
  role: UpdateContactMutation_updateContact_groups_role;
}

export interface UpdateContactMutation_updateContact_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface UpdateContactMutation_updateContact_pinnedEntries_Note_tags {
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

export interface UpdateContactMutation_updateContact_pinnedEntries_Note_assets_asset {
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

export interface UpdateContactMutation_updateContact_pinnedEntries_Note_assets {
  description: string | null;
  asset: UpdateContactMutation_updateContact_pinnedEntries_Note_assets_asset;
}

export interface UpdateContactMutation_updateContact_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: UpdateContactMutation_updateContact_pinnedEntries_Note_createdBy;
  tags: UpdateContactMutation_updateContact_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: UpdateContactMutation_updateContact_pinnedEntries_Note_assets[] | null;
}

export interface UpdateContactMutation_updateContact_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface UpdateContactMutation_updateContact_pinnedEntries_Conversation_tags {
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

export interface UpdateContactMutation_updateContact_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: UpdateContactMutation_updateContact_pinnedEntries_Conversation_createdBy;
  tags: UpdateContactMutation_updateContact_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type UpdateContactMutation_updateContact_pinnedEntries = UpdateContactMutation_updateContact_pinnedEntries_Note | UpdateContactMutation_updateContact_pinnedEntries_Conversation;

export interface UpdateContactMutation_updateContact {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: UpdateContactMutation_updateContact_picture | null;
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
  tags: UpdateContactMutation_updateContact_tags[] | null;
  fbProfile: string | null;
  profile: UpdateContactMutation_updateContact_profile | null;
  emails: UpdateContactMutation_updateContact_emails[];
  phones: UpdateContactMutation_updateContact_phones[];
  groups: UpdateContactMutation_updateContact_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: UpdateContactMutation_updateContact_pinnedEntries[];
}

export interface UpdateContactMutation {
  /**
   * Updates a contact record.
   */
  updateContact: UpdateContactMutation_updateContact;
}

export interface UpdateContactMutationVariables {
  contactId: string;
  name?: string | null;
  legalName?: string | null;
  bio?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  language?: string | null;
  fbProfile?: string | null;
  phones?: PhoneInput[] | null;
  emails?: EmailInput[] | null;
  picture?: AssetInput | null;
  gender?: Gender | null;
  tags?: string[] | null;
}
