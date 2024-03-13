import { Button, Dropdown, Input, Label, LargeTitle, makeStyles, shorthands, tokens, useId } from '@fluentui/react-components';
import React, { FormEvent, useState } from 'react';

const useStyles = makeStyles({
	loginContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		...shorthands.padding('100px'),
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
        width: '33.333'
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

function AddListingPage() {
  // State variables to store selected values
  const styles = useStyles();
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [professor, setProfessor] = useState('');
  const [lectureSection, setLectureSection] = useState('');
  const dropdownId = useId("dropdown-default");
  const departmentName = useId('departmentName');

  // Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { department, course, professor, lectureSection});
  };

  return (
    <div className={styles.loginContainer}>
        
      <LargeTitle>Add Listing</LargeTitle>
      <form onSubmit={handleSubmit}>
        <div className={styles.loginItemContainer}>
          <Label>Course Department:</Label>
          <Dropdown
          placeholder='Select Department'
          ></Dropdown>
        </div>
        <div className={styles.loginItemContainer}>
          <Label htmlFor="course">Course:</Label>
            <Dropdown
            placeholder='Select Course'
            >
            </Dropdown>
       
        </div>
        <div className={styles.loginItemContainer}>
          <Label htmlFor="professor">Professor:</Label>
          <Dropdown
          placeholder='Select Professor'
          ></Dropdown>
        </div>
        <div className={styles.loginItemContainer}>
          <Label>Lecture Section:</Label>
          <Input type="text" id="discussionSection" value={lectureSection} onChange={(e) => setLectureSection(e.target.value)} />
        </div>
        <Button type="submit" className={styles.submitButton}>Submit</Button>
      </form>
    </div>
  );
}

export default AddListingPage;
