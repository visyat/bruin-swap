// TODO: make sure this is relatively responsive at least
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
} from '@fluentui/react-components';
import { PersonRegular, KeyRegular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-components';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
	loginContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		...shorthands.padding('30px'),
		// shadow
		boxShadow: '0 6px 7px rgba(0, 0, 0, 0.3)',
		...shorthands.borderRadius(tokens.borderRadiusXLarge),
		backgroundColor: 'rgba(0, 0, 0, 0.02)',
		// borderR
	},
	title: {
		textAlign: 'center',
	},
	loginItemContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginTop: '10px',
		marginBottom: '10px',
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

interface LoginFormProps {
	isRegister: boolean;
}

interface UserReturn {
	user_id: string;
	user_name: string;
	email: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isRegister }) => {
	const styles = useStyles();
	const usernameId = useId('username');
	const passwordId = useId('password');
	const fullNameId = useId('password');
	const emailId = useId('email');
	const yearId = useId('year');
	const [userInput, setUserInput] = useState('');
	const [passInput, setPassInput] = useState('');
	const [fullNameInput, setFullNameInputInput] = useState('');
	const [yearInput, setYearInput] = useState<string>('');
	const [emailInput, setEmailInput] = useState('');
	const router = useRouter();

	const handleRegister = async () => {
		console.log('Logging in');
		let year = 0;
		// console.log(`User: ${userInput}, ${passInput}`);
		try {
			// Validate username
			console.log('Get request to')
			console.log(`${process.env.NEXT_PUBLIC_API_URI}/users`)
			// axios
			// 	.get(`${process.env.NEXT_PUBLIC_API_URI}/users`)
			// 	.then((res) => {
			// 		const users = res.data;
			// 		if (users.some((user: UserReturn) => user.user_id === userInput)) {
			// 			swal('That username is already in use :(');
			// 			return;
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		swal('Something went wrong! Please try again');
			// 	})

			// Validate email
			// Allow non-UCLA emails: const emailRegex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/;
			const emailRegex = /^[a-zA-Z0-9._-]+@(?:g\.)?ucla\.edu$/;
			if (!emailRegex.test(emailInput)) {
				swal('Please enter a valid UCLA email.');
				return;
			}
			// Validate year
            try {
                year = parseInt(yearInput);
            } catch (error) {
                swal('Please enter a valid graduation year.');
            }
			// Validate password
			if (passInput.length < 8 || 
				!/[a-z]/.test(passInput) ||
				!/[A-Z]/.test(passInput) ||
				!/\d/.test(passInput) ||
				!/[!@#$%^&*]/.test(passInput)
			) {
				swal('Please enter a more secure password. It should contain:\n- At least 8 characters\n- A lowercase letter\n- An uppercase letter\n- A digit\n- A special character');
			}
			return;
		} catch (error) {
			// swal('An unexpected error occured in account creation. Please try again.');
			swal(JSON.stringify(error));
		}
	};

	const handleLogin = async () => {

	};

	const loginInstead = () => router.push(`/login`);
	const registerInstead = () => router.push(`/register`);
	// const loginInstead = () => console.log('logging in instead');
	// const registerInstead = () => console.log('registering instead');

	return (
		<div className={styles.loginContainer}>
			<div className={styles.title}>
				<LargeTitle>{isRegister ? 'Register' : 'Login'}</LargeTitle>
			</div>

			<div className={styles.loginItemContainer}>
				{/* <Subtitle1 className={styles.subTitle}>Username</Subtitle1> */}
				<Label htmlFor={usernameId}>Username</Label>
				<Input
					id='userarea'
					placeholder='joebruin123'
					size='large'
					contentBefore={<PersonRegular />}
					onChange={(input) => setUserInput(input.target.value)}
				/>
			</div>

			<div className={styles.loginItemContainer}>
				{/* <Subtitle1 className={styles.subTitle}>Password</Subtitle1> */}
				<Label htmlFor={passwordId}>Password</Label>
				<Input
					id='passarea'
					type='password'
					placeholder='password'
					size='large'
					contentBefore={<KeyRegular />}
					onChange={(input) => setPassInput(input.target.value)}
				/>
			</div>
			{isRegister ? (<>
				<div className={styles.loginItemContainer}>
					{/* <Subtitle1 className={styles.subTitle}>Username</Subtitle1> */}
					<Label htmlFor={emailId}>Full Name</Label>
					<Input
						id='namearea'
						placeholder='Joe Bruin'
						size='large'
						contentBefore={<PersonRegular />}
						onChange={(input) => setEmailInput(input.target.value)}
					/>
				</div>

				<div className={styles.loginItemContainer}>
					{/* <Subtitle1 className={styles.subTitle}>Username</Subtitle1> */}
					<Label htmlFor={fullNameId}>UCLA Email</Label>
					<Input
						id='emailarea'
						placeholder='joebruin@g.ucla.edu'
						size='large'
						contentBefore={<PersonRegular />}
						onChange={(input) => setEmailInput(input.target.value)}
					/>
				</div>

				<div className={styles.loginItemContainer}>
					{/* <Subtitle1 className={styles.subTitle}>Username</Subtitle1> */}
					<Label htmlFor={yearId}>Graduation Year</Label>
					<Input
						id='yeararea'
						placeholder='2027'
						size='large'
						contentBefore={<PersonRegular />}
						onChange={(input) => setYearInput(input.target.value)}
					/>
				</div>
			</>) : <></>}
			<Button
				appearance='primary'
				onClick={() => (isRegister ? handleRegister() : handleLogin())}
				className={styles.submitButton}
			>
				Submit!
			</Button>
			{(isRegister
				? <Caption1>Already have an account? <Link as="button" onClick={() => loginInstead()} appearance='default'>Login!</Link></Caption1>
				: <Caption1>Don't have account? <Link as="button" onClick={() => registerInstead()} appearance='default'>Reigster!</Link></Caption1>
			)}
			
		</div>
	);
};

export default LoginForm;
