import { 
	makeStyles,
	shorthands, 
	LargeTitle,
	Dropdown,
	Option,
	Label,
} from '@fluentui/react-components';
//import { OpenCardMode } from '@fluentui/react';
import ClassCard from '../../components/classcard';
// import { LISTINGS } from '../../constants/temp_data';
import { useRouter } from 'next/router';
import { IListing } from '../../types/listing';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import SearchPosts from '@/components/SearchPosts';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
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
	},
	dropdownContainer: {
		
	}, dropdowns: {
		display: 'flex',
		flexDirection: 'row',

	}
});

interface TransactionRemote {
	transaction_id: number,
	user_id: string,
	class_wanted: string,
	class_to_drop: string, 
};

interface ClassRemote {
	section_code: string;
	department: string;
	course_num: string;
	course_name: string;
	professor: string;
	disc_section: string;
};

const Search = () => {
	const styles = useStyles();
	const [listings, setListings] = useState<IListing[]>([]);
	const [listingRequested, setListingsRequested] = useState<IListing[]>([]);

	const router = useRouter();
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
		if (!token) {
			router.push('/login');
		}
	}, []);

	// State variables to store selected values
	const [department, setDepartment] = useState<string | undefined>(undefined);
	const [course, setCourse] = useState<string | undefined>(undefined);
	const [professor, setProfessor] = useState<string | undefined>(undefined);
	const [lectureSection, setLectureSection] = useState<string>('');

	const [departmentList, setDepartmentList] = useState<string[]>([]);
	const [courseList, setCourseList] = useState<string[]>([]);
	const [professorList, setProfessorList] = useState<string[]>([]);

	const [classes, setClasses] = useState<ClassRemote[]>([]);

	const fetchClasses = async () => {
		console.log('Actually fetching classes');
		console.log(`${process.env.NEXT_PUBLIC_API_URI}/classes`);
		axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes`)
			.then((res) => {
				// console.log(JSON.stringify(res.data));
				const newDeptList = res.data.map((c: ClassRemote) => c.department);
				const uniqueDeptList = newDeptList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setDepartmentList(uniqueDeptList);

				const newCourseList = res.data.map((c: ClassRemote) => c.course_num);
				const uniqueCourseList = newCourseList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setCourseList(uniqueCourseList);

				const newProfessorList = res.data.map((c: ClassRemote) => c.professor);
				const uniqueProfessorList = newProfessorList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setProfessorList(uniqueProfessorList);
				
				setClasses(res.data);
			}).catch((err) => {
				swal('Something went wrong fetching classes.')
			});
	};

	// Update once department selected
	useEffect(() => {
		console.log('Dept selected');
		if (department) {
			console.log(department);
			const newCourseList = classes.filter((c: ClassRemote) => {
				// console.log(c.department+ '   ' + department);
				return c.department === department;
			}).map((c: ClassRemote) => c.course_num);
			console.log(`New: ${JSON.stringify(newCourseList)}`)
			const uniqueCourseList = newCourseList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
			console.log(`New: ${JSON.stringify(uniqueCourseList)}`)
			setCourseList(uniqueCourseList);
			const newListings = listings.filter((t: IListing) => {
				return t.classDept === department;
			});
			setListingsRequested(newListings);
		}
	}, [department]);

	// Update once department & coursenum selected
	useEffect(() => {
		console.log('Dept selected');
		if (department && course) {
			console.log(department+' '+course);
			const newProfList = classes.filter((c: ClassRemote) => {
				return c.department === department && c.course_num === course;
			}).map((c: ClassRemote) => c.professor);
			console.log(`New: ${JSON.stringify(newProfList)}`)
			const uniqueProfList = newProfList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
			setProfessorList(uniqueProfList);
			const newListings = listings.filter((t: IListing) => {
				return t.classDept === department && t.classNum === course;
			});
			setListingsRequested(newListings);
		}
	}, [course]);

	const fetchTransactions = async () => {
		const transactionsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/transactions`);
		const transactions = transactionsRes.data;

		// console.log(JSON.stringify(transactions));
		
		const listingsUnfiltered = await Promise.all(transactions.map(async (listingRemote: TransactionRemote) => {
					
			let classDeptRemote = 'error';
			let classNumRemote = 'error';
			let classTitleRemote = 'error';
			let instructorRemote = 'error';
			let lectureRemote = 'error';

			try {
				const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes/${listingRemote.class_to_drop}`);
				// swal(`Class: ${JSON.stringify(transactions)}`)
				if (res?.data[0]) {
					classDeptRemote = res.data[0].department;
					classNumRemote = res.data[0].course_num;
					classTitleRemote = res.data[0].course_name;
					instructorRemote = res.data[0].professor;
					lectureRemote = res.data[0].disc_section;
					console.log(classDeptRemote);
				} else {
					swal('Something went wrong getting course information!');
				}
			} catch (err) {
				swal('Something went wrong getting course information!');
			}
			
			return {
				transaction_id: listingRemote.transaction_id,
				user_id: listingRemote.user_id,
				classDept: classDeptRemote,
				classNum: classNumRemote,
				classTitle: classTitleRemote,
				classWanted: [listingRemote.class_wanted],
				instructor: instructorRemote,
				lecture: lectureRemote,
			};
		}));

		const listingsFiltered = listingsUnfiltered.filter((listing: IListing) => listing.classDept !== 'error');
		setListings(listingsFiltered);
		setListingsRequested(listingsFiltered);
	}

	useEffect(() => {
		fetchTransactions();
		fetchClasses();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.centerTitle}>
				<LargeTitle>Bruin Swap</LargeTitle>
			<div/>
			<div className={styles.dropdowns}>
				<div className={styles.dropdownContainer}>
					<Dropdown 
						placeholder='Select Department'
						value={department ? department : ''}
						onOptionSelect={(e, data) => setDepartment(data.optionText)}
					>
						{departmentList.map((option: string) =>
							<Option key={option} value={option}>
								{option}
							</Option>
						)}
					</Dropdown>
				</div>
				<div className={styles.dropdownContainer}>
					<Dropdown 
						placeholder='Select Course'
						value={course ? course : ''}
						onOptionSelect={(e, data) => setCourse(data.optionText)}
					>
						{courseList.map((option: string) =>
							<Option key={option} value={option}>
								{option}
							</Option>
						)}
					</Dropdown>
				</div>
			</div>
			<div>
				<div>
					{listingRequested.map((listing: IListing) => (
						<ClassCard data={listing} />
					))}
				</div>
			</div>
			</div>
		</div>
	);
};

export default Search;