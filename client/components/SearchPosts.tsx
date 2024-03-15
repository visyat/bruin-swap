import { Button, Input, makeStyles } from '@fluentui/react-components';
import React from 'react';


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

const SearchBar = () => {
const styles = useStyles();
  return (
    <div className="search-container">
      <Input type="text" className="search-input" placeholder="Search..." />
      <Button className="search-button">Search</Button>
    </div>
  );
};

export default SearchBar;