import { makeStyles, shorthands } from '@fluentui/react-components';
import { OpenCardMode } from '@fluentui/react';
import ClassCard from '../../components/classcard';
import { LISTINGS } from '../../constants/temp_data';
import { useRouter } from 'next/router';
import { IListing } from '@/.next/types/listing';
import { ListingProvider } from '@/.next/context/listingContext';

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

const Search = () => {
	const styles = useStyles();

	return (
		<ListingProvider>
			<div>
				<div className={styles.searchTitle}>
					<h1>Listings</h1>
				</div>
				<div className={styles.classes}>
					{LISTINGS.map((listing: IListing) => (
						<div className={styles.card} key={listing.transaction_id}>
							<ClassCard data={listing} />
						</div>
					))}
				</div>
			</div>
		</ListingProvider>
	);
};

export default Search;
