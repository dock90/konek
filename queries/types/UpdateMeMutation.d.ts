/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetInput, EmailInput, PhoneInput } from "./Global";

// ====================================================
// GraphQL mutation operation: UpdateMeMutation
// ====================================================

export interface UpdateMeMutation_updateMe_picture {
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

export interface UpdateMeMutation_updateMe_emails {
  email: string;
  label: string | null;
}

export interface UpdateMeMutation_updateMe_phones {
  number: string;
  label: string | null;
}

export interface UpdateMeMutation_updateMe_pubNubInfo {
  /**
   * `subscribeKey` used when initializing PubNub
   */
  subscribeKey: string;
  /**
   * `authKey` used when initializing PubNub. A new key will be generated when close to expiration.
   */
  authKey: string;
  /**
   * New keys are valid for 5 days.
   */
  expires: any;
  /**
   * Channel group to subscribe to.
   */
  channelGroup: string;
}

export interface UpdateMeMutation_updateMe_algoliaInfo {
  appId: string;
  /**
   * Key for searching. Will be null if contact does not have access to anything
   */
  searchKey: string | null;
}

export interface UpdateMeMutation_updateMe_cloudinaryInfo {
  cloudName: string;
  apiKey: string;
}

export interface UpdateMeMutation_updateMe_access {
  timeline: boolean;
  contacts: boolean;
  messages: boolean;
  groups: boolean;
  hasContact: boolean;
}

export interface UpdateMeMutation_updateMe {
  __typename: "Me";
  name: string;
  picture: UpdateMeMutation_updateMe_picture | null;
  /**
   * Folder where all profile specific assets should be stored.
   */
  assetFolderId: string;
  emails: UpdateMeMutation_updateMe_emails[];
  phones: UpdateMeMutation_updateMe_phones[];
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  pubNubInfo: UpdateMeMutation_updateMe_pubNubInfo;
  algoliaInfo: UpdateMeMutation_updateMe_algoliaInfo;
  cloudinaryInfo: UpdateMeMutation_updateMe_cloudinaryInfo;
  access: UpdateMeMutation_updateMe_access;
}

export interface UpdateMeMutation {
  updateMe: UpdateMeMutation_updateMe;
}

export interface UpdateMeMutationVariables {
  name?: string | null;
  picture?: AssetInput | null;
  emails?: EmailInput[] | null;
  phones?: PhoneInput[] | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  language?: string | null;
}
