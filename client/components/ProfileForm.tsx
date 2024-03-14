import { useState } from 'react';
// import styles from '../styles/Edit.module.css';
import {
	Button,
	makeStyles,
	Input,
	LargeTitle,
	Subtitle1,
	Label,
	shorthands,
	useId,
	Caption1,
	Body1,
	Link,
	Title1,
	Body1Strong,
} from '@fluentui/react-components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useStyles = makeStyles({
	title: {
		textAlign: 'center',
	},
	profileFormContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '10px',
		marginBottom: '10px',
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

function ProfileForm() {
	const styles = useStyles();
	const [userId, setUserId] = useState('Loading...');
	const [email, setEmail] = useState('Loading...');
	const [fullName, setFullName] = useState('Loading...');
	const [year, setYear] = useState('Loading...');
	const router = useRouter();

	// Login protecto
	const [token, setToken] = useState<string | null>(null);
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
		setYear(res.data[0].year_level);
		setEmail(res.data[0].email);
	}

	useEffect(() => {
		if (token)
			fetchProfileInfo();
	}, [token]);	

	if (!token) return <div>Loading...</div>

	return (
		<div className={styles.profileFormContainer}>
			<Title1>Profile Information</Title1>
			<div className='profile-field-container' style={{ marginBottom: '20px' }}>
				<div className='profile-field' style={{ display: 'flex', alignItems: 'center' }}>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Username: </label>
					<Body1>{userId}</Body1>
				</div>
			</div>
			<div className='profile-field-container' style={{ marginBottom: '20px' }}>
				<div className='profile-field' style={{ display: 'flex', alignItems: 'center' }}>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Email: </label>
					<Body1>{email}</Body1>
				</div>
			</div>
			<div className='profile-field-container' style={{ marginBottom: '20px' }}>
				<div className='profile-field' style={{ display: 'flex', alignItems: 'center' }}>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Full Name: </label>
					<Body1>{fullName}</Body1>
				</div>
			</div>
			<div className='profile-field-container' style={{ marginBottom: '20px' }}>
				<div className='profile-field' style={{ display: 'flex', alignItems: 'center' }}>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Year in School: </label>
					<Body1>{year}</Body1>
				</div>
			</div>
		</div>
	);
}

export default ProfileForm;

