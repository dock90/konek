/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetReadThroughMutation
// ====================================================

export interface SetReadThroughMutation_setReadThrough_picture {
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

export interface SetReadThroughMutation_setReadThrough {
  __typename: "Room";
  roomId: string;
  /**
   * Name of the room to show in the UI
   */
  name: string;
  qtyUnread: number;
  /**
   * Own member ID in room
   */
  memberId: string;
  /**
   * ID of the last message read.
   */
  readThrough: string | null;
  picture: SetReadThroughMutation_setReadThrough_picture | null;
}

export interface SetReadThroughMutation {
  setReadThrough: SetReadThroughMutation_setReadThrough;
}

export interface SetReadThroughMutationVariables {
  roomId: string;
  messageId: string;
}
