import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Fonts, stylesheets, etc. can be added here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
  )};
}

export default MyDocument;
