// components/navbar/ClassCard.tsx
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
import { ArrowSwapFilled } from '@fluentui/react-icons';
import { IListing, IOpenTransaction } from '../types/listing';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

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
	swap: {
		minWidth: '100px',
		paddingLeft: '10px',
		paddingRight: '10px',
		paddingTop: '5px',
		paddingBottom: '5px',
	},
});

interface CardProps {
	data: IOpenTransaction;
}

const ClassCardOpen: React.FC<CardProps> = ({ data }) => {
	const { transaction_id, classDept, classNum, classTitle, instructor, lecture, requested } = data;
	// const [transaction, setTransaction] = useState(null);
	const router = useRouter();
	const styles = useStyles();
	const [deleted, setDeleted] = useState(false);

	const handleSwapClick = () => {
		console.log('Data:', data);
		// It is guaranteed that transaction_id will be a number
		axios.delete(`${process.env.NEXT_PUBLIC_API_URI}/transactions/${transaction_id}`)
			.then((res) => {
				swal('Successfully removed!')
				setDeleted(true);
			}).catch((err) => {
				swal('Something went wrong. Please try removing again.');
			});
	};

	if (deleted) return <></>;

	return (
		<Card className={styles.card} appearance='filled' as='div' size='small'>
			<CardHeader
				className={styles.header}
				header={
					<div className={styles.details}>
						<Body1>{`${classDept} ${classNum}: ${classTitle}`}</Body1>
					</div>
				}
				description={<Caption1>{`${instructor}`}</Caption1>}
			/> 
			{/* Include CardPreview for wanted classes */}
			<CardFooter
				className={styles.footer}
				action={
					(<Button
						className={styles.swap}
							icon={<ArrowSwapFilled />}
						as='button'
						appearance='primary'
						shape='rounded'
						onClick={() => handleSwapClick()}
					>
						{requested ? 'Accepted!' : 'Delete'}
					</Button>)
				}
			>
				<Caption1>Lecture: {lecture}</Caption1>
			</CardFooter>
		</Card>
	);
};

export default ClassCardOpen;
