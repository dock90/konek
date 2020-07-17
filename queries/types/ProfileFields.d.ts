/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileFields
// ====================================================

export interface ProfileFields_picture {
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

export interface ProfileFields_emails {
  email: string;
  label: string | null;
}

export interface ProfileFields_phones {
  number: string;
  label: string | null;
}

export interface ProfileFields {
  __typename: "Profile";
  profileId: string;
  name: string;
  /**
   * Room ID for direct messaging.
   */
  roomId: string;
  picture: ProfileFields_picture | null;
  emails: ProfileFields_emails[] | null;
  phones: ProfileFields_phones[] | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  language: string | null;
}
