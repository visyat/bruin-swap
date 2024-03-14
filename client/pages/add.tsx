import { Button, makeStyles, Title1 } from '@fluentui/react-components';
import AddOwnCard from '@/components/AddOwnCard';

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

const Add = () => {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<AddOwnCard />
		</div>
	);
};

export default Add;
