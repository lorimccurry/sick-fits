import { AppInitialProps } from 'next/app';
import Document, {
  Html,
  Head,
  NextScript,
  Main,
  DocumentContext,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

// TODO: fix typing of MyDocument and return type getInitialProps
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }
  render(): ReactElement {
    return (
      <Html lang="en-US">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
