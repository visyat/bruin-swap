import { makeStyles, shorthands } from '@fluentui/react-components';
import { OpenCardMode } from '@fluentui/react';
import { LISTINGS } from '../constants/temp_data';
import { useRouter } from 'next/router';
import { IListing } from '../types/listing';
import { useEffect } from 'react';

const useStyles = makeStyles({
	searchTitle: {
		marginTop: '10px',
		marginBottom: '10px',
		textAlign: 'center',
		fontSize: '30px',
	},
	classes: {
		width: '100%',
		height: '100%',
		marginLeft: '0 auto',
		marginRight: '0 auto',
		display: 'grid',
		gridTemplateColumns: '2fr 2fr 2fr',
		// placeItems: 'center',
		alignItems: 'center',
		gridGap: '100px',
	},
	card: {
		cursor: 'pointer',
		width: '100%',
		minHeight: '100px',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const Page = () => {
	const styles = useStyles();
	
	const router = useRouter();

	useEffect(() => {
		router.push('/listings/search');
	}, []);
	return (
		<></>
	);
};

export default Page;

