/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_picture {
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

export interface MeQuery_me_emails {
  email: string;
  label: string | null;
}

export interface MeQuery_me_phones {
  number: string;
  label: string | null;
}

export interface MeQuery_me_pubNubInfo {
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

export interface MeQuery_me_algoliaInfo {
  appId: string;
  /**
   * Key for searching. Will be null if contact does not have access to anything
   */
  searchKey: string | null;
}

export interface MeQuery_me_cloudinaryInfo {
  cloudName: string;
  apiKey: string;
}

export interface MeQuery_me_access {
  timeline: boolean;
  contacts: boolean;
  messages: boolean;
  groups: boolean;
  hasContact: boolean;
}

export interface MeQuery_me {
  __typename: "Me";
  name: string;
  picture: MeQuery_me_picture | null;
  /**
   * Folder where all profile specific assets should be stored.
   */
  assetFolderId: string;
  emails: MeQuery_me_emails[];
  phones: MeQuery_me_phones[];
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  pubNubInfo: MeQuery_me_pubNubInfo;
  algoliaInfo: MeQuery_me_algoliaInfo;
  cloudinaryInfo: MeQuery_me_cloudinaryInfo;
  access: MeQuery_me_access;
}

export interface MeQuery {
  me: MeQuery_me;
}
