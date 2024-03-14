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
import { useRouter } from 'next/router';

const useStyles = makeStyles({
	cardContainer: {
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
	cardItemContainer: {
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
	const [lectureSectionList, setLectureSectionList] = useState<string[]>([]);

	const [classes, setClasses] = useState<ClassRemote[]>([]);

	const fetchClasses = async () => {
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

	// // Update once department selected
	// useEffect(() => {
	// 	const newCourseList = classes.map((c: ClassRemote) => c.course_num);
	// 	const uniqueCourseList = newCourseList.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
	// 	setCourseList(uniqueCourseList);
	// }, [department]);

	useEffect(() => {
		fetchClasses();
	}, []);

	// TODO: properly filter finding posts
	const submitWishlist = async () => {
		// First, validate post
		// Make sure such a class exists
		const classToAdd = classes.find((c: ClassRemote) => {
			// console.log(JSON.stringify(c));
			return (
				c.department === department &&
				c.course_num === course &&
				c.professor === professor &&
				c.disc_section === lectureSection
			);
		});

		if (!classToAdd) {
			swal('Those classes were not found.');
			return;
		}

		const newWishlistItem = {
			user_jwt: token,
			class_wished: classToAdd.section_code,
		}

		axios.post(`${process.env.NEXT_PUBLIC_API_URI}/wishlist`, newWishlistItem)
			.then((res) => {
				swal('Success!');
				router.push('/');
			}).catch((err) => {
				swal('Something went wrong. Please try again');
			})
	}

	const submitHeld = async () => {
		// First, validate post
		// Make sure such a class exists
		const classToAdd = classes.find((c: ClassRemote) => {
			// console.log(JSON.stringify(c));
			return (
				c.department === department &&
				c.course_num === course &&
				c.professor === professor &&
				c.disc_section === lectureSection
			);
		});

		if (!classToAdd) {
			swal('Those classes were not found.');
			return;
		}

		const newHeldItem = {
			user_jwt: token,
			class_enrolled: classToAdd.section_code,
		}

		axios.post(`${process.env.NEXT_PUBLIC_API_URI}/enrollments`, newHeldItem)
			.then((res) => {
				swal('Success!');
				router.push('/');
			}).catch((err) => {
				swal('Something went wrong. Please try again');
			})
	}

	return (
		<div className={styles.cardContainer}>
			<LargeTitle>Add Class</LargeTitle>
			{/* <form onSubmit={handleSubmit}> */}
				<div className={styles.cardItemContainer}>
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
				<div className={styles.cardItemContainer}>
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
				<div className={styles.cardItemContainer}>
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
				<div className={styles.cardItemContainer}>
					<Label>Lecture Section:</Label>
					<Input
						type='text'
						id='discussionSection'
						value={lectureSection}
						placeholder='1A'
						onChange={(input) => setLectureSection(input.target.value)}
					/>
				</div>

				<Button type='submit' className={styles.submitButton} onClick={() => submitWishlist()}>
					Add to Wishlist
				</Button>
				<Button type='submit' className={styles.submitButton} onClick={() => submitHeld()}>
					Add held Class
				</Button>
			{/* </form> */}
		</div>
	);
}

export default AddListingPage;
