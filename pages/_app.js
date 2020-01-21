import React from 'react';
import App from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withData from '../lib/withData';

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
    const { apollo, Component, pageProps } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(CRM);
