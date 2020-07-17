/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MeFields
// ====================================================

export interface MeFields_picture {
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

export interface MeFields_emails {
  email: string;
  label: string | null;
}

export interface MeFields_phones {
  number: string;
  label: string | null;
}

export interface MeFields_pubNubInfo {
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

export interface MeFields_algoliaInfo {
  appId: string;
  /**
   * Key for searching. Will be null if contact does not have access to anything
   */
  searchKey: string | null;
}

export interface MeFields_cloudinaryInfo {
  cloudName: string;
  apiKey: string;
}

export interface MeFields_access {
  timeline: boolean;
  contacts: boolean;
  messages: boolean;
  groups: boolean;
  hasContact: boolean;
}

export interface MeFields {
  __typename: "Me";
  name: string;
  picture: MeFields_picture | null;
  /**
   * Folder where all profile specific assets should be stored.
   */
  assetFolderId: string;
  emails: MeFields_emails[];
  phones: MeFields_phones[];
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  pubNubInfo: MeFields_pubNubInfo;
  algoliaInfo: MeFields_algoliaInfo;
  cloudinaryInfo: MeFields_cloudinaryInfo;
  access: MeFields_access;
}
