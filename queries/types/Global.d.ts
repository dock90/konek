/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EntryAccessType {
  PRIVATE = "PRIVATE",
  SHARED = "SHARED",
}

export enum EntryTypes {
  Conversation = "Conversation",
  Note = "Note",
}

/**
 * Use `UNDEFINED` to un-set a previous value.
 */
export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  UNDEFINED = "UNDEFINED",
}

export enum TagAccessType {
  PRIVATE = "PRIVATE",
  SHARED = "SHARED",
}

export interface AssetInput {
  format?: string | null;
  isAudio?: boolean | null;
  originalFilename?: string | null;
  publicId: string;
  resourceType: string;
  type: string;
}

export interface ContactGroupInput {
  groupId: string;
  roleId: string;
}

export interface EmailInput {
  email: string;
  label?: string | null;
}

export interface NoteAssetInput {
  asset: AssetInput;
  description?: string | null;
}

export interface PhoneInput {
  label?: string | null;
  number: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
