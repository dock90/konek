import 'isomorphic-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import {
  defaultDataIdFromObject,
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { auth } from './firebase';
import { ROOM_FIELDS, ROOM_QUERY, ROOMS_QUERY } from '../queries/RoomQueries';
import introspectionResultData from './fragmenTypes';

const httpLink = createHttpLink({
  uri: 'https://equipter-crm-staging.herokuapp.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.currentUser.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    const typeName = object.__typename;
    switch (typeName) {
      case 'Me':
        // Will only ever be one, so a static ID is fine.
        return typeName;
      default:
        const idField = `${typeName.charAt(0).toLowerCase() +
          typeName.slice(1)}Id`;
        if (idField in object) {
          return object[idField];
        }
    }
    return defaultDataIdFromObject(object);
  },
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResultData.data,
  }),
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {
    Query: {
      async room(obj, args, ctx) {
        if (!args.roomId) {
          return undefined;
        }

        const roomInfo = ctx.cache.readFragment({
          fragment: ROOM_FIELDS,
          id: args.roomId,
        });

        if (roomInfo) {
          // It is already in the cache. Life is so simple sometimes, enjoy it while it lasts. 👴
          return roomInfo;
        }

        // Get the current room list.
        const { data: roomList } = await ctx.client.query({
          query: ROOMS_QUERY,
        });

        // Check if the current room list includes have the room we're searching for.
        // This can happen if the "rooms" (plural) query hasn't completed yet when the "room" (singular) is queried.
        const match = roomList.rooms.find(r => r.roomId === args.roomId);

        if (match) {
          return match;
        }

        // Load the requested room.
        const result = await ctx.client.query({
          query: ROOM_QUERY,
          variables: {
            roomId: args.roomId,
          },
        });

        // Update the cache with the requested room.
        ctx.cache.writeQuery({
          query: ROOMS_QUERY,
          data: {
            rooms: [result.data.room, ...roomList.rooms],
          },
        });

        return result.data.room;
      },
    },
  },
});

cache.writeData({
  data: {
    pnConnected: false,
  },
});
