import { useRouter } from 'next/router';
import { IListing } from '../../types/listing';
import { LISTINGS } from '../../constants/temp_data';
import { useEffect, useState } from 'react';
import {
	makeStyles,
	shorthands,
	Body1,
	LargeTitle,
	Display,
	Subtitle2Stronger,
	Divider,
	Button,
	ToggleButton,
} from '@fluentui/react-components';
import { ArrowSwapFilled } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import axios from 'axios';
import swal from 'sweetalert';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		rowGap: '5px,',
	},
	courseName: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: tokens.spacingVerticalXL,
		marginBottom: tokens.spacingVerticalXL,
	},
	contents: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		maxWidth: '100%',
		minWidth: '100%',
	},
	left: {
		display: 'flex',
		flexBasis: 0,
		flexGrow: 20,
		flexDirection: 'column',
		textAlign: 'right',
		alignItems: 'flex-end',
		marginRight: tokens.spacingHorizontalL,
		...shorthands.padding(tokens.spacingHorizontalM),
	},
	right: {
		display: 'flex',
		flexBasis: 0,
		flexGrow: 20,
		flexDirection: 'column',
		marginLeft: tokens.spacingHorizontalL,
		...shorthands.padding(tokens.spacingHorizontalM),
	},
	buttonContainer: {
		display: 'flex',
		flexBasis: 0,
		flexGrow: 0,
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	divider: {
		flexGrow: 1,
		alignSelf: 'stretch',
		marginLeft: 0,
		marginRight: 0,
	},
	button: {
		marginTop: tokens.spacingHorizontalM,
	},
	swap: {
		marginTop: tokens.spacingHorizontalM,
	},
	swapContainer: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: tokens.spacingHorizontalL,
		marginBottom: tokens.spacingHorizontalXL,
	},
});

const ListingPage = () => {
	const router = useRouter();
	const styles = useStyles();
	const [isLoading, setIsLoading] = useState(true);
	const [listing, setListing] = useState<IListing | null>(null);
	const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(null);
	const [selectedClassNotFound, setSelectedClassNotFound] = useState(false);
	const { transaction_id } = router.query;
	let transaction_id_num = -1;
	const [token, setToken] = useState<string | null>(null);
	const [fullName, setFullName] = useState('');
	const [userId, setUserId] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
		if (!token) {
			router.push('/login');
		}
	}, []);

	const fetchProfileInfo = async () => {
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users/${token}`);
		setUserId(res.data[0].user_id);
		setFullName(res.data[0].user_name);
		setEmail(res.data[0].email);
	}

	useEffect(() => {
		if (token)
			fetchProfileInfo();
	}, [token]);	

	useEffect(() => {
		console.log(`Transaction param: ${transaction_id}`);
		const fetchListing = async () => {
			if (!transaction_id) {
				return;
			}
			setIsLoading(true);
			// Try to parse listing data
			try {
				if (typeof transaction_id !== 'string') {
					throw 'did not get a valid transaction_id';
				}
				transaction_id_num = parseInt(transaction_id);
			} catch (error) {
				console.log(
					`Could not get transaction. ${typeof transaction_id} ${transaction_id} is not a valid transaction ID`,
				);
			}
			// Try to fetch listing data
			try {
				const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/transactions-by-tid/${transaction_id}`);
				console.log(JSON.stringify(res.data));

				const class_drop_res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes/${res.data[0].class_to_drop}`);
				const class_wanted_res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes/${res.data[0].class_wanted}`);
				const user_id_res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users/${res.data[0].user_jwt}`);
				console.log(JSON.stringify(class_drop_res.data[0]))
				console.log(JSON.stringify(class_wanted_res.data[0]))
				console.log(JSON.stringify(user_id_res.data[0].user_id))

				const fetchedListing = {
					transaction_id: parseInt(transaction_id as string),
					user_id: user_id_res.data[0].user_id,
					classDept: class_drop_res.data[0].department,
					classNum: class_drop_res.data[0].course_num,
					classTitle: class_drop_res.data[0].course_name,
					classWanted: [class_wanted_res.data[0].department+' '+class_wanted_res.data[0].course_num],
					instructor: class_drop_res.data[0].professor,
					lecture: class_drop_res.data[0].disc_section,
				};	
				
				setListing(fetchedListing);

				// console.log(JSON.stringify(listing));
				// console.log(JSON.stringify(fetchedListing));
			} catch (err) {
				swal('Something went wrong fetching that transaction.');
				router.push('/listings/search');
			}
			setIsLoading(false);
		};

		fetchListing();
	}, [transaction_id]); // Should not change

	const handleSwapRequestClick = async () => {
		// TODO: block spamming requests.
		console.log(`Selected: ${selectedClassIndex}`);
		if (selectedClassIndex === null) {
			console.log('No class was selected');
			setSelectedClassNotFound(true);
			return;
		}
		const requester = {
			requester_id: userId,
			requester_name: fullName,
			requester_email: email,
		}
		axios.put(`${process.env.NEXT_PUBLIC_API_URI}/request/${transaction_id}`, requester)
			.then((res) => {
				swal('Successfully requested! Sent a notification to the poster.');
			}).catch((err) => {
				swal('Something went wrong. Please try again.');
			});
	};

	if (isLoading) return <div>Loading...</div>; // TOOD: improve loading page
	if (!listing) return <div>Listing not found</div>;

	const classCodeString = `${listing.classDept} ${listing.classNum}`;
	const classNameString = `${listing.classTitle}`;
	const classesWanted = listing.classWanted.map((name, i) => (
		<ToggleButton
			className={styles.button}
			key={i}
			appearance='outline'
			shape='circular'
			size='large'
			onClick={() => setSelectedClassIndex(i)}
			checked={selectedClassIndex === i}
		>
			{name}
		</ToggleButton>
	));

	return (
		<div className={styles.container}>
			<div className={styles.courseName}>
				<Display>{classCodeString}</Display>
				<LargeTitle>{classNameString}</LargeTitle>
			</div>
			<div className={styles.contents}>
				<div className={styles.left}>
					<Subtitle2Stronger>Instructor</Subtitle2Stronger>
					<Body1>{listing.instructor}</Body1>
					<br></br>
					<Subtitle2Stronger>Section</Subtitle2Stronger>
					<Body1>{listing.lecture}</Body1>
				</div>
				<div>
					<Divider vertical style={{ height: '100%' }} />
				</div>
				<div className={styles.right}>
					<Subtitle2Stronger>In exchange for:</Subtitle2Stronger>
					<div className={styles.buttonContainer}>{classesWanted}</div>
				</div>
			</div>
			<div className={styles.swapContainer}>
				{selectedClassNotFound ? <Body1>You haven't selected a class!</Body1> : <></>}
				<Button
					className={styles.button}
					icon={<ArrowSwapFilled />}
					onClick={() => handleSwapRequestClick()}
					as='button'
					appearance='primary'
					shape='circular'
				>
					Request!
				</Button>
			</div>
		</div>
	);
};

export default ListingPage;
