import { AppProps } from 'next/app';
import '../app/globals.css'; // Or wherever your global styles are located
import RootLayout from '../app/layout';
import { Theme, FluentProvider, webLightTheme } from '@fluentui/react-components';

const customLightTheme: Theme = {
	...webLightTheme,
	// borderRadius
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FluentProvider theme={customLightTheme}>
			<RootLayout>
				<Component {...pageProps} />
			</RootLayout>
		</FluentProvider>
	);
}

export default MyApp;
