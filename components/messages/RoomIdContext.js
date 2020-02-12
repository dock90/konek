import React from 'react';

export const RoomIdContext = React.createContext({
  roomId: undefined,
  setRoomId: () => {},
});

RoomIdContext.displayName = 'RoomId';
