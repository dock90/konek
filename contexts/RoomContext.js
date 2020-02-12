import React from 'react';

export const RoomContext = React.createContext({
  room: undefined,
  setRoom: () => {},
});
