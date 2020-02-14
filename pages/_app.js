import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import 'isomorphic-fetch';
import Page from '../components/Page';
import { auth } from '../firebase';

// link to graphql endpoint
const httpLink = createHttpLink({
  uri: 'https://equipter-crm-staging.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) =>
  auth.currentUser.getIdToken().then(token => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }))
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: object => {
      const idField = object.__typename.charAt(0).toLowerCase() + object.__typename.slice(1) + 'Id';
      if (idField in object) {
        return object[idField];
      }
      return defaultDataIdFromObject(object);
    }
  }),
});

class CRM extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes query to user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={client}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default CRM;
