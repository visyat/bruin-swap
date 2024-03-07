import { OpenCardMode } from '@fluentui/react';
import Class from '../components/classcard';
import { CLASSES } from '../constants/temp_data';

interface Class {
    id: number;
    classDept: string;
    classNum: string;
    prof: string;
    lecture: string;
};

const Search = () => {
	return (
		<div className="shop">
			<div className="shotTitle">
				<h1>BruinSwap Listings</h1>
			</div>
			<div className="classes">
				{CLASSES.map((listing: Class) => <Class data={listing}/>)}
			</div>
		</div>
	)
};

export default Search;
