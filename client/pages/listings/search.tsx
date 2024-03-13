import { makeStyles, shorthands } from '@fluentui/react-components';
import { OpenCardMode } from '@fluentui/react';
import ClassCard from '../../components/ClassCard';
// import { LISTINGS } from '../../constants/temp_data';
import { useRouter } from 'next/router';
import { IListing } from '../../types/listing';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

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

interface TransactionRemote {
	transaction_id: number,
	user_id: string,
	class_wanted: string,
	class_to_drop: string, 
};

const Search = () => {
	const styles = useStyles();
	const [listings, setListings] = useState<IListing[]>([]);

	const fetchTransactions = async () => {
		const transactionsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/transactions`);
		const transactions = transactionsRes.data;

		// console.log(JSON.stringify(transactions));
		
		const listingsUnfiltered = await Promise.all(transactions.map(async (listingRemote: TransactionRemote) => {
					
			let classDeptRemote = 'error';
			let classNumRemote = 'error';
			let classTitleRemote = 'error';
			let instructorRemote = 'error';
			let lectureRemote = 'error';

			try {
				const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes/${listingRemote.class_to_drop}`);
				// swal(`Class: ${JSON.stringify(transactions)}`)
				if (res?.data[0]) {
					classDeptRemote = res.data[0].department;
					classNumRemote = res.data[0].course_num;
					classTitleRemote = res.data[0].course_name;
					instructorRemote = res.data[0].professor;
					lectureRemote = res.data[0].disc_section;
					console.log(classDeptRemote);
				} else {
					swal('Something went wrong getting course information!');
				}
			} catch (err) {
				swal('Something went wrong getting course information!');
			}
			
			return {
				transaction_id: listingRemote.transaction_id,
				user_id: listingRemote.user_id,
				classDept: classDeptRemote,
				classNum: classNumRemote,
				classTitle: classTitleRemote,
				classWanted: [listingRemote.class_wanted],
				instructor: instructorRemote,
				lecture: lectureRemote,
			};
		}));

		const listingsFiltered = listingsUnfiltered.filter((listing: IListing) => listing.classDept !== 'error');
		setListings(listingsFiltered);
	}

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<div>
			<div className={styles.searchTitle}>
				<h1>Listings</h1>
			</div>
			<div className={styles.classes}>
				{listings.map((listing: IListing) => (
					<ClassCard data={listing} />
					// JSON.stringify(listing)
				))}
			</div>
		</div>
	);
};

export default Search;
