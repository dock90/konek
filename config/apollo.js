import "isomorphic-fetch";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { auth } from "./firebase";
import { ApolloClient } from "apollo-client";
import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";

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
      case 'Me':
        // Will only ever be one, so a static ID is fine.
        return typeName;
      default:
        const idField = typeName.charAt(0).toLowerCase() + typeName.slice(1) + "Id";
        if (idField in object) {
          return object[idField];
        }
    }
    return defaultDataIdFromObject(object);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});
