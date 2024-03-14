import axios from 'axios';
import { useEffect, useState } from 'react';
import constStyles from '../styles/Account.module.css';
import ClassCardAccount from '../components/ClassCardAccount';
import ProfileForm from '../components/ProfileForm';
import ClassCardWishlist from '../components/ClassCardWishlist';
import { useRouter } from 'next/router';
import { Title1, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
	title: {
		textAlign: 'center',
	},
	informationContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '20px',
		marginBottom: '10px',
		marginLeft: '100px',
	},
	inputField: {
		marginBottom: '10px',
		fontWeight: 'bold',
	},
	button: {
		color: 'gray',
	},

	subTitle: {
		textAlign: 'left',
		marginTop: '10px',
		marginBottom: '10px',
	},
	submitButton: {
		marginTop: '10px',
		marginBottom: '16px',
	},
});

const Account = () => {
	const styles = useStyles();
	const router = useRouter();

	// Login protect
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
		<div className={styles.informationContainer}>
			<ProfileForm
				email='someone@example.com'
				fullName='Someone Something'
				major='Electrical Engineering'
				gradYear='2023'
			/>
		</div>

		);
	} else if (output === 'Current Classes') {
		content = (
			<div className={styles.informationContainer}>
				<div>
					<Title1>Current Classes</Title1>
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
			<div className={styles.informationContainer}>
				<div>
					<Title1>Wishlist Classes</Title1>
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
		content = <Title1 className={styles.informationContainer}>No content selected</Title1>;
	}

	return (
		<div>
			<div>
				<button
					className={constStyles.profileButton}
					onClick={() => handleButtonClick('Profile Information')}
				>
					Profile Information
				</button>
			</div>

			<div>
				<button
					className={constStyles.currentButton}
					onClick={() => handleButtonClick('Current Classes')}
				>
					Current Classes
				</button>
			</div>

			<div>
				<button
					className={constStyles.wishlistButton}
					onClick={() => handleButtonClick('Wishlist Classes')}
				>
					Wishlist Classes
				</button>
			</div>
			<div>
				<span className={constStyles.outputContainer}>{content}</span>
			</div>
		</div>
	);
};

export default Account;
