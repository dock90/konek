/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomsQuery
// ====================================================

export interface RoomsQuery_rooms_picture {
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

export interface RoomsQuery_rooms {
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
  picture: RoomsQuery_rooms_picture | null;
}

export interface RoomsQuery {
  /**
   * Rooms that current profile has messaged in, sorted by most recent first.
   */
  rooms: RoomsQuery_rooms[];
}
