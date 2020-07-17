/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AcceptInvitationMutation
// ====================================================

export interface AcceptInvitationMutation_acceptInvitation_picture {
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

export interface AcceptInvitationMutation_acceptInvitation_emails {
  email: string;
  label: string | null;
}

export interface AcceptInvitationMutation_acceptInvitation_phones {
  number: string;
  label: string | null;
}

export interface AcceptInvitationMutation_acceptInvitation_pubNubInfo {
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

export interface AcceptInvitationMutation_acceptInvitation_algoliaInfo {
  appId: string;
  /**
   * Key for searching. Will be null if contact does not have access to anything
   */
  searchKey: string | null;
}

export interface AcceptInvitationMutation_acceptInvitation_cloudinaryInfo {
  cloudName: string;
  apiKey: string;
}

export interface AcceptInvitationMutation_acceptInvitation_access {
  timeline: boolean;
  contacts: boolean;
  messages: boolean;
  groups: boolean;
  hasContact: boolean;
}

export interface AcceptInvitationMutation_acceptInvitation {
  __typename: "Me";
  name: string;
  picture: AcceptInvitationMutation_acceptInvitation_picture | null;
  /**
   * Folder where all profile specific assets should be stored.
   */
  assetFolderId: string;
  emails: AcceptInvitationMutation_acceptInvitation_emails[];
  phones: AcceptInvitationMutation_acceptInvitation_phones[];
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
  pubNubInfo: AcceptInvitationMutation_acceptInvitation_pubNubInfo;
  algoliaInfo: AcceptInvitationMutation_acceptInvitation_algoliaInfo;
  cloudinaryInfo: AcceptInvitationMutation_acceptInvitation_cloudinaryInfo;
  access: AcceptInvitationMutation_acceptInvitation_access;
}

export interface AcceptInvitationMutation {
  /**
   * Associate profile with a contact via invitation code. A null response indicates that no matching invitation code was found.
   */
  acceptInvitation: AcceptInvitationMutation_acceptInvitation | null;
}

export interface AcceptInvitationMutationVariables {
  code: string;
}
