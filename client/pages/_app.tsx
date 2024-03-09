import { AppProps } from 'next/app';
import '../app/globals.css'; // Or wherever your global styles are located
import RootLayout from '@/app/layout';
import { Theme, FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const customLightTheme: Theme = {
	...teamsLightTheme,
	// borderRadius
}

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<FluentProvider theme={teamsLightTheme}>
			<RootLayout>
				<Component {...pageProps} />
			</RootLayout>
		</FluentProvider>
	);
}

export default MyApp;
