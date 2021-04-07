import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import Page from '../components/Page';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}