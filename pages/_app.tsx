import {
    FluentProvider,
    webLightTheme,
    Button
} from '@fluentui/react-components';
import { Fabric } from '@fluentui/react';
import Head from 'next/head';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fabric>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next.js + Fluent UI Example</title>
      </Head>
      <Component {...pageProps} />
    </Fabric>
  )
}