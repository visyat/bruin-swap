import {
	Button,
	Dropdown,
	Input,
	Label,
	LargeTitle,
	makeStyles,
	shorthands,
	tokens,
	useId,
	Option,
} from '@fluentui/react-components';
import { FormEvent, FormEventHandler, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const useStyles = makeStyles({
	loginContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		...shorthands.padding('40px'),
		// shadow
		boxShadow: '0 6px 7px rgba(0, 0, 0, 0.3)',
		...shorthands.borderRadius(tokens.borderRadiusXLarge),
		backgroundColor: 'rgba(0, 0, 0, 0.02)',
		// borderR
	},
	title: {
		textAlign: 'center',
		marginTop: '10px',
	},
	infoEntry: {
		width: '33.333',
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
		alignItems: 'center',
		marginBottom: '10px',
	},
});

interface ClassRemote {
	section_code: string;
	department: string;
	course_num: string;
	course_name: string;
	professor: string;
	disc_section: string;
};

const AddListingPage = () => {
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
	}, []);

	// State variables to store selected values
	const styles = useStyles();
	const [department, setDepartment] = useState<string | undefined>(undefined);
	const [course, setCourse] = useState<string | undefined>(undefined);
	const [professor, setProfessor] = useState<string | undefined>(undefined);
	const [lectureSection, setLectureSection] = useState<string | undefined>(undefined);

	const [departmentList, setDepartmentList] = useState<string[]>([]);
	const [courseList, setCourseList] = useState<string[]>([]);
	const [professorList, setProfessorList] = useState<string[]>([]);
	const [lectureSectionList, setLectureSectionList] = useState<string[]>([]);

	const [classes, setClasses] = useState<ClassRemote[]>([]);

	const fetchClasses = async () => {
		axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes`)
			.then((res) => {
				console.log(JSON.stringify(res.data));
				setClasses(res.data);
				const newDeptList = classes.map((c: ClassRemote) => c.department);
				const uniqueDeptList = newDeptList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setDepartmentList(uniqueDeptList);
			}).catch((err) => {
				swal('Something went wrong fetching classes.')
			});
	};

	// Update once department selected
	useEffect(() => {
		const newCourseList = classes.map((c: ClassRemote) => c.course_num);
		const uniqueCourseList = newCourseList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
		setCourseList(uniqueCourseList);
	}, [department]);

	useEffect(() => {
		fetchClasses();
	}, []);

	const dropdownId = useId('dropdown-default');
	const departmentName = useId('departmentName');

	// Function to handle form submission
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', { department, course, professor, lectureSection });
	};

	return (
		<div className={styles.loginContainer}>
			{department}
			<form onSubmit={handleSubmit}>
				<div className={styles.loginItemContainer}>
					<Label>Course Department:</Label>
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
				<div className={styles.loginItemContainer}>
					<Label htmlFor='course'>Course:</Label>
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
				<div className={styles.loginItemContainer}>
					<Label htmlFor='professor'>Professor:</Label>
					<Dropdown
						placeholder='Select Professor'
						value={professor ? professor : ''}
						onOptionSelect={(e, data) => setProfessor(data.optionText)}
					>
						{professorList.map((option: string) =>
							<Option key={option} value={option}>
								{option}
							</Option>
						)}
					</Dropdown>
				</div>
				<div className={styles.loginItemContainer}>
					<Label>Lecture Section:</Label>
					<Input
						type='text'
						id='discussionSection'
						value={lectureSection}
						onChange={(e) => setLectureSection(e.target.value)}
					/>
				</div>
				<Button type='submit' className={styles.submitButton}>
					Submit
				</Button>
			</form>
		</div>
	);
}

export default AddListingPage;
