'use client';

import { AppProps } from 'next/app';
import '../app/globals.css'; // Or wherever your global styles are located
import RootLayout from '../app/layout';
import { Theme, FluentProvider, webLightTheme } from '@fluentui/react-components';
import axios from 'axios';

const customLightTheme: Theme = {
	...webLightTheme,
	colorPaletteRedBackground3: '#d13438',
	// borderRadius
};

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
