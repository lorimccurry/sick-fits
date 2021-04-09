import { AppProps } from 'next/app';
import React, { ReactElement } from 'react';
import Page from '../components/Page';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import {} from '@apollo/client';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface PageProps {
  query?: string;
}

// TODO: fix type for props. AppProps & figure out typing for ApolloProvider client
function MyApp({ Component, pageProps, apollo }: AppProps): ReactElement {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps: PageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
