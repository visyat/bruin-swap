import { AppProps } from 'next/app';
import '../app/globals.css'; // Or wherever your global styles are located
import RootLayout from '@/app/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
