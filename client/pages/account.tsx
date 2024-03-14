import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Account.module.css';
import ClassCardAccount from '../components/ClassCardAccount';
import ProfileForm from '../components/ProfileForm';
import ClassCardWishlist from '../components/ClassCardWishlist';
import { useRouter } from 'next/router';
import { makeStyles, Button, LargeTitle } from '@fluentui/react-components';
import { PersonAccountsFilled, BriefcaseFilled, ClipboardTaskListLtrFilled } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-components';

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
	contentContainer: {
		flexGrow: 10,
		backgroundColor: 'green',
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

const Account = () => {
	const router = useRouter();
	const localStyles = useStyles();

	// Login protecto
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
		if (!token) {
			router.push('/login');
		}
	}, []);

	const [output, setOutput] = useState('');

	const handleButtonClick = (text: string) => {
		setOutput(text);
		setOutput(text);
	};


	let content;
	if (output === 'Profile Information') {
		content = (
			<ProfileForm
				email='someone@example.com'
				fullName='Someone Something'
				major='Electrical Engineering'
				gradYear='2023'
			/>
		);
	} else if (output === 'Current Classes') {
		content = (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div>
					<LargeTitle>Current Classes</LargeTitle>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<ClassCardAccount
						data={{
							classDept: 'COM SCI',
							classNum: '35L',
							classTitle: 'Software Construction Laboratory',
							instructor: 'Eggert, P.',
							lecture: '3A',
						}}
					/>
					<ClassCardAccount
						data={{
							classDept: 'COM SCI',
							classNum: '32',
							classTitle: 'Intro to CS II',
							instructor: 'Eggert, P.',
							lecture: '3A',
						}}
					/>
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
					<ClassCardWishlist
						data={{
							classDept: 'COM SCI',
							classNum: '35L',
							classTitle: 'Software Construction Laboratory',
							instructor: 'Eggert, P.',
							lecture: '3A',
						}}
						token={token as string}
					/>
					<ClassCardWishlist
						data={{
							classDept: 'COM SCI',
							classNum: '32',
							classTitle: 'Intro to CS II',
							instructor: 'Eggert, P.',
							lecture: '3A',
						}}
						token={token as string}
					/>
				</div>
			</div>
		);
	} else {
		content = <></>;
	}

	return (
		<div className={localStyles.container} style={{backgroundColor: 'yellow'}}>
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
				
			</div>
			<div className={localStyles.contentContainer}>
				{content}
			</div>
		</div>
	);
};

export default Account;
