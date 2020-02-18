import "isomorphic-fetch";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { auth } from "./firebase";
import { ApolloClient } from "apollo-client";
import {
  defaultDataIdFromObject,
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { ROOM_FIELDS } from "../queries/RoomQueries";
import introspectionResultData from "./fragmenTypes";

const httpLink = createHttpLink({
  uri: "https://equipter-crm-staging.herokuapp.com/graphql"
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.currentUser.getIdToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    const typeName = object.__typename;
    switch (typeName) {
      case "Me":
        // Will only ever be one, so a static ID is fine.
        return typeName;
      default:
        const idField =
          typeName.charAt(0).toLowerCase() + typeName.slice(1) + "Id";
        if (idField in object) {
          return object[idField];
        }
    }
    return defaultDataIdFromObject(object);
  },
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: introspectionResultData.data
  })
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  // Required for @client fields to be resolved by the cache.
  resolvers: {
    Query: {
      async room(obj, args, ctx, info) {
        if (!args.roomId) {
          return undefined;
        }

        const roomInfo = ctx.cache.readFragment({
          fragment: ROOM_FIELDS,
          id: args.roomId,
        });
        // TODO: We may need to fetch from the server if it doesn't exist locally...
        return roomInfo;
      }
    }
  }
});

cache.writeData({
  data: {
    pnConnected: false,
  },
});
