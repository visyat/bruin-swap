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
	Divider,
	Title1,
} from '@fluentui/react-components';
import { FormEvent, FormEventHandler, useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';

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
		fontWeight:'bold',
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
	divider: {
		backgroundColor: '#0078d4',
		fontWeight:'bold',
		height: '12px',
		width: '300px',
		alignItems: 'center',
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
	const styles = useStyles();
	const [department, setDepartment] = useState<string | undefined>(undefined);
	const [course, setCourse] = useState<string | undefined>(undefined);
	const [professor, setProfessor] = useState<string | undefined>(undefined);
	const [lectureSection, setLectureSection] = useState<string>('');

	const [departmentWanted, setDepartmentWanted] = useState<string | undefined>(undefined);
	const [courseWanted, setCourseWanted] = useState<string | undefined>(undefined);
	const [professorWanted, setProfessorWanted] = useState<string | undefined>(undefined);
	const [lectureSectionWanted, setLectureSectionWanted] = useState<string>('');

	const [departmentList, setDepartmentList] = useState<string[]>([]);
	const [courseList, setCourseList] = useState<string[]>([]);
	const [professorList, setProfessorList] = useState<string[]>([]);

	const [departmentListWanted, setDepartmentListWanted] = useState<string[]>([]);
	const [courseListWanted, setCourseListWanted] = useState<string[]>([]);
	const [professorListWanted, setProfessorListWanted] = useState<string[]>([]);


	const [classes, setClasses] = useState<ClassRemote[]>([]);

	const fetchClasses = async () => {
		axios.get(`${process.env.NEXT_PUBLIC_API_URI}/classes`)
			.then((res) => {
				// console.log(JSON.stringify(res.data));
				const newDeptList = res.data.map((c: ClassRemote) => c.department);
				const uniqueDeptList = newDeptList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setDepartmentList(uniqueDeptList);
				setDepartmentListWanted(uniqueDeptList);

				const newCourseList = res.data.map((c: ClassRemote) => c.course_num);
				const uniqueCourseList = newCourseList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setCourseList(uniqueCourseList);
				setCourseListWanted(uniqueCourseList);

				const newProfessorList = res.data.map((c: ClassRemote) => c.professor);
				const uniqueProfessorList = newProfessorList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
				setProfessorList(uniqueProfessorList);
				setProfessorListWanted(uniqueProfessorList);
				
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
		}
	}, [course]);


	// Update once departmentwanted selected
	useEffect(() => {
		console.log('Dept selected');
		if (departmentWanted) {
			console.log(departmentWanted);
			const newCourseList = classes.filter((c: ClassRemote) => {
				// console.log(c.departmentWanted+ '   ' + departmentWanted);
				return c.department === departmentWanted;
			}).map((c: ClassRemote) => c.course_num);
			console.log(`New: ${JSON.stringify(newCourseList)}`)
			const uniqueCourseList = newCourseList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
			console.log(`New: ${JSON.stringify(uniqueCourseList)}`)
			setCourseListWanted(uniqueCourseList);
		}
	}, [departmentWanted]);

	// Update once departmentwanted & coursenumwanted selected
	useEffect(() => {
		console.log('Dept selected');
		if (departmentWanted && courseWanted) {
			console.log(departmentWanted+' '+courseWanted);
			const newProfList = classes.filter((c: ClassRemote) => {
				return c.department === departmentWanted && c.course_num === courseWanted;
			}).map((c: ClassRemote) => c.professor);
			console.log(`New: ${JSON.stringify(newProfList)}`)
			const uniqueProfList = newProfList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
			setProfessorListWanted(uniqueProfList);
		}
	}, [courseWanted]);

	useEffect(() => {
		fetchClasses();
	}, []);

	const dropdownId = useId('dropdown-default');
	const departmentName = useId('departmentName');

	// Function to handle form submission
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission logic here
		// console.log('Form submitted:', { department, course, professor, lectureSection });
	};

	// TODO: properly filter finding posts
	const submitPost = async () => {
		// First, validate post
		// Make sure such a class exists
		const classToDrop = classes.find((c: ClassRemote) => {
			// console.log(JSON.stringify(c));
			return (
				c.department === department &&
				c.course_num === course &&
				c.professor === professor &&
				c.disc_section === lectureSection
			);
		});

		// console.log(department, course, professor, lectureSection);

		const classWanted = classes.find((c: ClassRemote) => {
			// console.log(JSON.stringify(c));
			return (
				c.department === departmentWanted &&
				c.course_num === courseWanted &&
				c.professor === professorWanted &&
				c.disc_section === lectureSectionWanted
			);
		});

		// console.log(JSON.stringify(classToDrop));
		// console.log(JSON.stringify(classWanted));

		// CS000331A

		if (!classToDrop || !classWanted) {
			swal('Those classes were not found.');
			return;
		}

		const newTransaction = {
			t_id: Math.floor(Math.random() * 32767),
			user_jwt: token,
			class_wanted: classWanted.section_code,
			class_dropped: classToDrop.section_code,
		}

		axios.post(`${process.env.NEXT_PUBLIC_API_URI}/transactions`, newTransaction)
			.then((res) => {
				swal('Success!');
				router.push('/');
			}).catch((err) => {
				swal('Something went wrong. Please try again');
			})
	}

	return (
		<div className={styles.loginContainer}>
			<LargeTitle>Add Listing</LargeTitle>
			{/* <form onSubmit={handleSubmit}> */}
			<div>
				<Title1>Course You Want to Drop: </Title1>
			</div>
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
						placeholder='1A'
						onChange={(input) => setLectureSection(input.target.value)}
					/>
				</div>
				<div>
				<Title1>Course You Want in Exchange: </Title1>
				</div>
				<div className={styles.loginItemContainer}>
					<Label>Course Department:</Label>
					<Dropdown 
						placeholder='Select Department'
						value={departmentWanted ? departmentWanted : ''}
						onOptionSelect={(e, data) => setDepartmentWanted(data.optionText)}
					>
						{departmentListWanted.map((option: string) =>
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
						value={courseWanted ? courseWanted : ''}
						onOptionSelect={(e, data) => setCourseWanted(data.optionText)}
					>
						{courseListWanted.map((option: string) =>
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
						value={professorWanted ? professorWanted : ''}
						onOptionSelect={(e, data) => setProfessorWanted(data.optionText)}
					>
						{professorListWanted.map((option: string) =>
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
						value={lectureSectionWanted}
						placeholder='1A'
						onChange={(input) => setLectureSectionWanted(input.target.value)}
					/>
				</div>

				<Button type='submit' className={styles.submitButton} onClick={() => submitPost()}>
					Submit
				</Button>
			{/* </form> */}
		</div>
	);
}

export default AddListingPage;
