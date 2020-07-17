/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ContactGroupInput, PhoneInput, EmailInput, Gender, TagAccessType, EntryAccessType } from "./Global";

// ====================================================
// GraphQL mutation operation: CreateContactMutation
// ====================================================

export interface CreateContactMutation_createContact_picture {
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

export interface CreateContactMutation_createContact_tags {
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

export interface CreateContactMutation_createContact_profile_picture {
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

export interface CreateContactMutation_createContact_profile_emails {
  email: string;
  label: string | null;
}

export interface CreateContactMutation_createContact_profile_phones {
  number: string;
  label: string | null;
}

export interface CreateContactMutation_createContact_profile_contacts_picture {
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

export interface CreateContactMutation_createContact_profile_contacts_tags {
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

export interface CreateContactMutation_createContact_profile_contacts {
  __typename: "Contact";
  contactId: string;
  name: string;
  country: string | null;
  picture: CreateContactMutation_createContact_profile_contacts_picture | null;
  tags: CreateContactMutation_createContact_profile_contacts_tags[] | null;
}

export interface CreateContactMutation_createContact_profile {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: CreateContactMutation_createContact_profile_picture | null;
  emails: CreateContactMutation_createContact_profile_emails[] | null;
  phones: CreateContactMutation_createContact_profile_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  contacts: CreateContactMutation_createContact_profile_contacts[];
}

export interface CreateContactMutation_createContact_emails {
  email: string;
  label: string | null;
}

export interface CreateContactMutation_createContact_phones {
  number: string;
  label: string | null;
}

export interface CreateContactMutation_createContact_groups_group {
  __typename: "Group";
  groupId: string;
  name: string;
}

export interface CreateContactMutation_createContact_groups_role {
  roleId: string;
}

export interface CreateContactMutation_createContact_groups {
  group: CreateContactMutation_createContact_groups_group;
  role: CreateContactMutation_createContact_groups_role;
}

export interface CreateContactMutation_createContact_pinnedEntries_Note_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface CreateContactMutation_createContact_pinnedEntries_Note_tags {
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

export interface CreateContactMutation_createContact_pinnedEntries_Note_assets_asset {
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

export interface CreateContactMutation_createContact_pinnedEntries_Note_assets {
  description: string | null;
  asset: CreateContactMutation_createContact_pinnedEntries_Note_assets_asset;
}

export interface CreateContactMutation_createContact_pinnedEntries_Note {
  __typename: "Note";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: CreateContactMutation_createContact_pinnedEntries_Note_createdBy;
  tags: CreateContactMutation_createContact_pinnedEntries_Note_tags[];
  access: EntryAccessType;
  message: string;
  assets: CreateContactMutation_createContact_pinnedEntries_Note_assets[] | null;
}

export interface CreateContactMutation_createContact_pinnedEntries_Conversation_createdBy {
  /**
   * If I am the owner of this entry or not.
   */
  isMe: boolean;
}

export interface CreateContactMutation_createContact_pinnedEntries_Conversation_tags {
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

export interface CreateContactMutation_createContact_pinnedEntries_Conversation {
  __typename: "Conversation";
  entryId: string;
  title: string;
  pinned: boolean;
  /**
   * The profile that created this entry.
   */
  createdBy: CreateContactMutation_createContact_pinnedEntries_Conversation_createdBy;
  tags: CreateContactMutation_createContact_pinnedEntries_Conversation_tags[];
  access: EntryAccessType;
  startDate: any;
  endDate: any | null;
}

export type CreateContactMutation_createContact_pinnedEntries = CreateContactMutation_createContact_pinnedEntries_Note | CreateContactMutation_createContact_pinnedEntries_Conversation;

export interface CreateContactMutation_createContact {
  __typename: "Contact";
  contactId: string;
  name: string;
  legalName: string | null;
  picture: CreateContactMutation_createContact_picture | null;
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
  tags: CreateContactMutation_createContact_tags[] | null;
  fbProfile: string | null;
  profile: CreateContactMutation_createContact_profile | null;
  emails: CreateContactMutation_createContact_emails[];
  phones: CreateContactMutation_createContact_phones[];
  groups: CreateContactMutation_createContact_groups[];
  /**
   * Will return a max of 50 entries.
   */
  pinnedEntries: CreateContactMutation_createContact_pinnedEntries[];
}

export interface CreateContactMutation {
  /**
   * Creates a new contact record.
   */
  createContact: CreateContactMutation_createContact | null;
}

export interface CreateContactMutationVariables {
  name: string;
  legalName?: string | null;
  bio?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  language?: string | null;
  fbProfile?: string | null;
  groups: ContactGroupInput[];
  phones?: PhoneInput[] | null;
  emails?: EmailInput[] | null;
}
