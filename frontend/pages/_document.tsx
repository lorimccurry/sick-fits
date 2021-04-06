import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ReactElement } from 'react';

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en-US">
        {/* <Head></Head> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
