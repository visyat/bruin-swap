import { Button, makeStyles, Title1 } from '@fluentui/react-components';
import LoginForm from '@/components/LoginForm';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
	container: {
		width: '100%',
		height: '80vh',
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const Login = () => {
	const styles = useStyles();
	const router = useRouter();

	// Log out and redirect
	localStorage.removeItem('token');
	router.push('/login');

	return <div className={styles.container}>Logging out...</div>;
};

export default Login;
