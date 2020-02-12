import {createContext} from "react";

export const MeContext = createContext({
  me: {
    name: undefined,
    roomId: undefined,
    picture: undefined,
    emails: [],
    phones: [],
    city: undefined,
    state: undefined,
    postalCode: undefined,
    county: undefined,
    language: undefined,

    groups: [],

    pubNubInfo: {},
    searchKey: undefined,
  },
  // So that the context can be updated.
  updateMe: () => {},
});
