import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import { client } from '../config/apollo';
import '../config/PubNub';
import { BugsnagErrorBoundary } from '../config/BugSnag';

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
      <BugsnagErrorBoundary>
        <ApolloProvider client={client}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </BugsnagErrorBoundary>
    );
  }
}

export default CRM;
