import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Account.module.css';
import ClassCardAccount from '../components/ClassCardAccount';
import ProfileForm from '../components/ProfileForm';
import ClassCardWishlist from '../components/ClassCardWishlist';
import ClassCardOpen from '../components/ClassCardOpen';
import { useRouter } from 'next/router';
import { makeStyles, Button, LargeTitle } from '@fluentui/react-components';
import { PersonAccountsFilled, BriefcaseFilled, ClipboardTaskListLtrFilled, ArrowSyncCircleFilled } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-components';
import { AddCircleFilled } from '@fluentui/react-icons';
import { IOpenTransaction } from '@/types/listing';

const useStyles = makeStyles({
	container: {
		paddingTop: '5vh',
		width: '100%',
		minHeight: '10vh',
		// flexGrow: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	optionContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	paddingContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	contentContainer: {
		flexGrow: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
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
	buttonContainer: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'flex-start',
		marginTop: tokens.spacingVerticalXXL,
		marginBottom: tokens.spacingVerticalXXL,
		marginLeft: tokens.spacingHorizontalM, // Add left margin
		marginRight: tokens.spacingHorizontalM, // Add right margin
	}
});

interface UserClassRemote {
	course_name: string;
	course_num: string;
	department: string;
	disc_section: string;
	professor: string;
	section_code: string;
	user_jwt: string
};

interface TransactionRemote {
	class_to_drop: string;
	class_wanted: string;
	requested: boolean;
	requesting_user: string;
	transaction_id: number;
};

const Account = () => {
	const router = useRouter();
	const localStyles = useStyles();
	const [wishlist, setWishlist] = useState<UserClassRemote[]>([]);
	const [enrollments, setEnrollments] = useState<UserClassRemote[]>([]);
	const [transactions, setTransactions] = useState<IOpenTransaction[]>([]);

	// Login protecto
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
		if (!token) {
			router.push('/login');
		}
	}, []);

	useEffect(() => {
		if (token) {
			fetchWishlist();
			fetchEnrollments();
			fetchTransactions();
		}
	}, [token]);	

	const [output, setOutput] = useState('');

	const fetchWishlist = async () => {
		// console.log(token);
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/wishlist/${token}`);
		// console.log(`${process.env.NEXT_PUBLIC_API_URI}/wishlist/${token}`);
		// console.log('Wishlist');
		// console.log(res.data);
		setWishlist(res.data);
	};

	const fetchEnrollments = async () => {
		// console.log(token);
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/enrollments/${token}`);
		// console.log(`${process.env.NEXT_PUBLIC_API_URI}/enrollments/${token}`);
		// console.log('Enrollments');
		// console.log(res.data);
		setEnrollments(res.data);
	};

	const fetchTransactions = async () => {
		console.log(token);
		const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/transactions-by-user/${token}`);
		const transactionsFull = await Promise.all(res.data.map(async (c: TransactionRemote) => {
			const class_drop_code = c.class_to_drop;
			const class_drop_res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes/${class_drop_code}`);
			return {
				transaction_id: c.transaction_id,
				classDept: class_drop_res.data[0].department,
				classNum: class_drop_res.data[0].course_num,
				classTitle: class_drop_res.data[0].course_name,
				instructor: class_drop_res.data[0].professor,
				lecture: class_drop_res.data[0].disc_section,
				requested: c.requested,
			};
		}));
		setTransactions(transactionsFull);
	};
	

	const handleButtonClick = (text: string) => {
		setOutput(text);
		setOutput(text);
	};


	let content = <div>Loading...</div>;
	if (output === 'Profile Information') {

		content = (
			<ProfileForm />
		);
	} else if (output === 'Current Classes') {
		content = (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<LargeTitle>Current Classes</LargeTitle>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{enrollments.map((c: UserClassRemote) => 
						<ClassCardAccount
							data={{
								classDept: c.department,
								classNum: c.course_num,
								classTitle: c.course_name,
								instructor: c.professor,
								lecture: c.disc_section,
							}}
							token={token ? token : 'Error'}
						/>
					)}
					<Button
						className={styles.swap}
						icon={<AddCircleFilled />}
						as='button'
						appearance='primary'
						shape='rounded'
						onClick={() => router.push('/add')}
					>
						Add to Enrollments
					</Button>
				</div>
			</div>
		);
	} else if (output === 'Wishlist Classes') {

		content = (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<LargeTitle style={{textAlign: 'center'}}>Wishlist Classes</LargeTitle>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{wishlist.map((c: UserClassRemote) => 
						<ClassCardWishlist
							data={{
								classDept: c.department,
								classNum: c.course_num,
								classTitle: c.course_name,
								instructor: c.professor,
								lecture: c.disc_section,
							}}
							token={token ? token : 'Error'}
						/>
					)}
					<Button
						className={styles.swap}
						icon={<AddCircleFilled />}
						as='button'
						appearance='primary'
						shape='rounded'
						onClick={() => router.push('/add')}
					>
						Add to Wishlist
					</Button>
				</div>
			</div>
		);
	} else if (output === 'Open Transactions') {

		content = (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<LargeTitle style={{textAlign: 'center'}}>Open Transactions For</LargeTitle>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{transactions.map((t: IOpenTransaction) => 
						<ClassCardOpen
							data={t}
						/>
					)}
					<Button
						className={styles.swap}
						icon={<AddCircleFilled />}
						as='button'
						appearance='primary'
						shape='rounded'
						onClick={() => router.push('/add')}
					>
						Add to Wishlist
					</Button>
				</div>
			</div>
		);
	} else {
		content = <></>;
	}

	return (
		<div className={localStyles.container}>
			<div className={localStyles.optionContainer}>
				<div className={localStyles.buttonContainer}>
					<Button
						icon={<PersonAccountsFilled />}
						onClick={() => handleButtonClick('Profile Information')}
						as='button'
						appearance='primary'
						shape='rounded'
						size="large"
					>
						Profile Information
					</Button>
				</div>
				<div className={localStyles.buttonContainer}>
					<Button
						icon={<BriefcaseFilled />}
						onClick={() => handleButtonClick('Current Classes')}
						as='button'
						appearance='primary'
						shape='rounded'
						size="large"
					>
						Current Classes
					</Button>
				</div>
				<div className={localStyles.buttonContainer}>
					<Button
						icon={<ClipboardTaskListLtrFilled />}
						onClick={() => handleButtonClick('Wishlist Classes')}
						as='button'
						appearance='primary'
						shape='rounded'
						size="large"
					>
						Wishlist Classes
					</Button>
				</div>
				<div className={localStyles.buttonContainer}>
					<Button
						icon={<ArrowSyncCircleFilled />}
						onClick={() => handleButtonClick('Open Transactions')}
						as='button'
						appearance='primary'
						shape='rounded'
						size="large"
					>
						Open Transactions
					</Button>
				</div>
				
			</div>
			<div className={localStyles.contentContainer}>
				{content}
			</div>
			<div className={localStyles.optionContainer}>
				<br></br>
			</div>
		</div>
	);
};

export default Account;
