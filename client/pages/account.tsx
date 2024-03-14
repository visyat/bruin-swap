import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Account.module.css';
import ClassCardAccount from '../components/ClassCardAccount';
import ProfileForm from '../components/ProfileForm';
import ClassCardWishlist from '../components/ClassCardWishlist';
import { useRouter } from 'next/router';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
	container: {
		width: '100%',
		minHeight: '10vh',
		// flexGrow: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	optionContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	contentContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
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
					<p>Current Classes</p>
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
					<p>Wishlist Classes</p>
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
					/>
					<ClassCardWishlist
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
	} else {
		content = <div>No content selected</div>;
	}

	return (
		<div className={localStyles.container} style={{backgroundColor: 'yellow'}}>
			<div className={localStyles.optionContainer}>
				<div>
					<button className={styles.profileButton} onClick={() => handleButtonClick('Profile Information')}>
						Profile Information
					</button>
				</div>
				<div>
					<button className={styles.currentButton} onClick={() => handleButtonClick('Current Classes')}>
						Current Classes
					</button>
				</div>
				<div>
					<button className={styles.wishlistButton} onClick={() => handleButtonClick('Wishlist Classes')}>
						Wishlist Classes
					</button>
				</div>
			</div>
			<div className={localStyles.contentContainer}>
				{content}
				{/* <div>
					<span className={`${styles.divider} ${styles.flexContainer}`}></span>
				</div>

				<div>
					<span className={styles.outputContainer}>{content}</span>
				</div> */}
			</div>
		</div>
	);
};

export default Account;
