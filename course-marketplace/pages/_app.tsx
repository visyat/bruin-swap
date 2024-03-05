import { metadata } from '../constants/metadata'; 
import Head from 'next/head';
import { AppProps } from 'next/app';

const viewportContent: string | undefined = metadata.description !== null ? metadata.description : undefined;
const pageTitle: string | undefined = typeof metadata.title === 'string' ? metadata.title : undefined;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content={viewportContent} />
        <title>Next.js + Fluent UI Example</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}