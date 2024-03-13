import { Input, LargeTitle, makeStyles } from '@fluentui/react-components';
import { useState, useEffect } from 'react';


const useStyles = makeStyles({
	centerTitle:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '60vh',
		color: '#2774AE',
		fontFamily: 'sans serif',
		marginTop: '10px'
	},
	search:{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '80vh',
		height: '7vh'
	}
});


const Page = () => {
	const styles = useStyles();
	const [searchTerm, setSearchTerm] = useState('');

	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
	}, []);

	const handleSearchChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setSearchTerm(event.target.value);
		// You can perform search-related actions here
	};

	return (
		<div className={styles.centerTitle}>
			<LargeTitle>Bruin Swap</LargeTitle>
		<div>
			<div>
		<Input
				type='text'
				placeholder='Search...'
				className={styles.search}
				onChange={handleSearchChange}
				value={searchTerm}
			/>
			{token}
		</div>
		</div>

			
			
		</div>
	);
};

export default Page;
