import { Button, makeStyles, Title1 } from '@fluentui/react-components';
import AddListing from '@/components/AddListing';

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

	return (
		<div className={styles.container}>
			<AddListing />
		</div>
	);
};

export default Login;
