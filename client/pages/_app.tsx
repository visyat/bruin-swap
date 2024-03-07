import { AppProps } from 'next/app';
import '../app/globals.css'; // Or wherever your global styles are located
import RootLayout from '@/app/layout';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FluentProvider>
			<RootLayout>
				<Component {...pageProps} />
			</RootLayout>
		</FluentProvider>
	);
}

export default MyApp;
