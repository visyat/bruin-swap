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
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

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
	// const [response, setResponse] = useState({});
	// useEffect(() => {
	// 	const newUser = {
	// 		"user_id": "abcdefghijkl",
	// 		"user_name": "rathulatrahult",
	// 		"passwd": "aBC323$#$ioj",
	// 		"year": 1,
	// 		"email": "ldksj123asdffdl@g.ucla.edu"
	// 	}
	// 	axios
	// 		.post(`${process.env.NEXT_PUBLIC_API_URI}/users`, newUser)
	// 		.then((res) => {
	// 			console.log(`Response: ${res}`);
	// 			setResponse(res);
	// 		}).catch((err) => {
	// 			console.error(`Error: ${err.msg}`);
	// 		});
	// }, []);

	const styles = useStyles();
	const usernameId = useId('username');
	const passwordId = useId('password');
	const fullNameId = useId('password');
	const emailId = useId('email');
	const yearId = useId('year');
	const [userInput, setUserInput] = useState('');
	const [passInput, setPassInput] = useState('');
	const [fullNameInput, setFullNameInput] = useState('');
	const [yearInput, setYearInput] = useState<string>('');
	const [emailInput, setEmailInput] = useState('');
	const router = useRouter();


	const loginInstead = () => router.push(`/login`);
	const registerInstead = () => router.push(`/register`);

	const handleRegister = async () => {
		console.log('Logging in');

		let yearNum = 0;
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
			// 	}).catch((error) => {
			// 		swal(`Something went wrong! Please try again ${error}`);
			// 		return;
			// 	})

			// async await to stop race condition
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users`);
			const users = res.data;
			if (users.some((user: UserReturn) => user.user_id === userInput)) {
				swal('That username is already in use :(');
				return;
			}
			
			if (userInput.length > 15) {
				swal('Ensure your username is less than 15 characters.');
				return;
			}
			
			// Validate full name
			if (fullNameInput.length > 50) {
				swal('Ensure your name is less than 50 characters.');
				return;
			}

			// Validate email
			// Allow non-UCLA emails: const emailRegex = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,4}$/;
			const emailRegex = /^[a-zA-Z0-9._-]+@(?:g\.)?ucla\.edu$/;
			if (!emailRegex.test(emailInput)) {
				swal('Please enter a valid UCLA email.');
				return;;
			}
			if (emailInput.length > 50) {
				swal('Ensure your email is less than 50 characters.');
				return;
			}
			// Validate year
            try {
                yearNum = parseInt(yearInput);
            } catch (error) {
                swal('Please enter a valid year in school (1-7).');
				return;
            }
			if (yearNum < 1 || yearNum > 9) {
                swal('Please enter a valid year in school (1-7).');
				return;
			}

			// Validate password
			if (passInput.length < 8 || 
				passInput.length > 40 ||
				!/[a-z]/.test(passInput) ||
				!/[A-Z]/.test(passInput) ||
				!/\d/.test(passInput) ||
				!/[!@#$%^&*]/.test(passInput)
			) {
				swal('Please enter a more secure password. It should contain:\n- At least 8 characters\n- No more than 40 characters\n- A lowercase letter\n- An uppercase letter\n- A digit\n- A special character');
				return;
			}

			// By now, all user inputs have been validated and we can create an account
			console.log('Creating account!');

			// TODO: pass back password hash instead of password in plaintext?
			const newUser = {
				user_id: userInput, 
				user_name: fullNameInput, 
				passwd: passInput, 
				year: yearNum, 
				email: emailInput,
			};
			
			// Now, the registration is valid
			axios.post(`${process.env.NEXT_PUBLIC_API_URI}/users`, newUser)
				.then((res) => {
					swal('Success! Account created.');
					loginInstead();
				}).catch((err) => {
					swal('Something went wrong creating your account. Please try again');
					console.error(err);
				});

		} catch (error) {
			// swal('An unexpected error occured in account creation. Please try again.');
			console.error(error)
			swal('Something went wrong! Please try again.');
			return;
		}
	}

	const handleLogin = async () => {
		// userInput, passInput
		try {
			// async await to pause until username exists
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/users`);
			const users = res.data;
			if (!users.some((user: UserReturn) => user.user_id === userInput)) {
				swal('Username not found!');
				return;
			}

			// Attempt to log in
			axios.get(`${process.env.NEXT_PUBLIC_API_URI}/login/${userInput}/${passInput}`)
				.then((res) => {
					if (res?.data[0].user_jwt) {
						console.log(`Success found: ${JSON.stringify(res.data[0].user_jwt)}`);

						// Set cookie in client-side mode
						if (typeof window !== 'undefined') {
							Cookies.set('token', res.data[0].user_jwt, { expires: 7 }); 
							swal('Successfully logged in!');
							router.push('/');
						} else {
							swal('Something went wrong! Please log in again.')
						}
					}
					else
						swal('Something went wrong! Please log in again.')
				}).catch((err) => {
					swal('Something went wrong! Please log in again.')
				});
		} catch (error) {
			swal('Something went wrong! Please log in again.')
		}
	};

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
						onChange={(input) => setFullNameInput(input.target.value)}
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
					<Label htmlFor={yearId}>Year (1-7)</Label>
					<Input
						id='yeararea'
						placeholder='1'
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
				: <Caption1>Don't have account? <Link as="button" onClick={() => registerInstead()} appearance='default'>Register!</Link></Caption1>
			)}
			
		</div>
	);
};

export default LoginForm;
