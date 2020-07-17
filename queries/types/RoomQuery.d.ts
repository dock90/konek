/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RoomQuery
// ====================================================

export interface RoomQuery_room_picture {
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

export interface RoomQuery_room {
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
  picture: RoomQuery_room_picture | null;
}

export interface RoomQuery {
  /**
   * Info about a group or DM chat room.
   */
  room: RoomQuery_room;
}

export interface RoomQueryVariables {
  roomId: string;
}
