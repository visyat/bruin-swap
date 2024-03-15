import { 
	makeStyles,
	shorthands, 
	LargeTitle,
	Dropdown,
	Option,
} from '@fluentui/react-components';
//import { OpenCardMode } from '@fluentui/react';
import ClassCard from '../../components/classcard';
// import { LISTINGS } from '../../constants/temp_data';
import { useRouter } from 'next/router';
import { IListing } from '../../types/listing';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import SearchPosts from '@/components/SearchPosts';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	centerTitle:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '60vh',
		color: '#2774AE',
		fontFamily: 'sans serif',
		marginTop: '10px'
	},
	search:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '80vh',
		height: '7vh'
	},
	classes: {
		
	}
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
	const [searchTerm, setSearchTerm] = useState('');
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
	}, []);

	const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setSearchTerm(event.target.value);
		// You can perform search-related actions here
	};

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
		<div className={styles.container}>
			<div className={styles.centerTitle}>
				<LargeTitle>Bruin Swap</LargeTitle>
			<div/>
				<div>
					<div className={styles.classes}>
						{listings.map((listing: IListing) => (
							<ClassCard data={listing} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;