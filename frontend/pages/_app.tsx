import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import Page from '../components/Page';

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
