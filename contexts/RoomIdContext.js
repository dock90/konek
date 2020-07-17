import React from 'react';

export const RoomIdContext = React.createContext({
  // We only store the room ID and not the whole room info because the room info needs to be loaded from
  // Apollo so that it is updated when the unread info changes.
  roomId: undefined,
  setRoomId: () => {},
});
