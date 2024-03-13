// components/navbar/classcard.tsx
import {
	makeStyles,
	shorthands,
	Body1,
	Caption1,
	Button,
	Card,
	CardFooter,
	CardHeader,
	CardPreview,
	Theme,
} from '@fluentui/react-components';
import { DeleteDismissFilled } from '@fluentui/react-icons';
import { IClass } from '../types/listing';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
	card: {
		// fill div
		...shorthands.margin('auto'),
		width: '100%',
		maxWidth: '100%',
		minHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between', // ensure even footer
	},
	details: {
		// department, number, title, instructor
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexGrow: 0,
	},
	preview: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// padding: '10px',
		flexGrow: 0,
	},
	footer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// padding: '10px',
		flexGrow: 0,
	},
	remove: {
		minWidth: '100px',
		paddingLeft: '10px',
		paddingRight: '10px',
		paddingTop: '5px',
		paddingBottom: '5px',
		backgroundColor: '#d13438',
		// color when selected should be
		':hover': {
			backgroundColor: '#bc2f32',
		},
		':active': {
			backgroundColor: '#751d1f',
		},
	},
});

interface CardProps {
	data: IClass;
}

const ClassCardWishlist: React.FC<CardProps> = ({ data }) => {
	const { classDept, classNum, classTitle, instructor, lecture } = data;
	// const [transaction, setTransaction] = useState(null);
	const router = useRouter();
	const styles = useStyles();

	const handleRemoveClick = () => console.log('Deleteting course!'); //router.push(`${transaction_id}`);

	return (
		<Card className={styles.card} appearance='filled' as='div' size='small'>
			<CardHeader
				className={styles.header}
				header={
					<div className={styles.details}>
						<Body1>{`${classDept} ${classNum}: ${classTitle}`}</Body1>
					</div>
				}
				description={<Caption1 style={{ fontWeight: 'bold' }}>{`${instructor}`}</Caption1>}
			/>
			{/* Include CardPreview for wanted classes */}
			<CardFooter
				className={styles.footer}
				action={
					<Button
						className={styles.remove}
						icon={<DeleteDismissFilled />}
						onClick={() => handleRemoveClick()}
						as='button'
						appearance='primary'
						shape='rounded'
					>
						Remove!
					</Button>
				}
			>
				<Caption1>Lecture: {lecture}</Caption1>
			</CardFooter>
		</Card>
	);
};

export default ClassCardWishlist;
