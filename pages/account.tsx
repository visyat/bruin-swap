import { useState } from 'react';
import RootLayout from '../app/layout';
import styles from '../styles/Account.module.css';
import CourseCard from '../components/CourseCard';
import ProfileForm from '../components/ProfileForm';
import WishlistCourseCard from '../components/WishlistCourseCard';


const Account = () => {
  const [output, setOutput] = useState('');

  

  const handleButtonClick = (text: string) => {
    setOutput(text);
  };


  

  let content;
  if (output === 'Profile Information') {
    content = (
        <ProfileForm></ProfileForm>
    );
  } 

  

  else if(output === 'Current Classes'){
    content = (
      <div>
      <p>Current Classes</p>
      <CourseCard
                    courseName="CS 35L"
                    description="Software Construction Laboratory"
                    professor="Paul Eggert"
                    discussionSection="1E"
                />
                <CourseCard
                    courseName="MATH 101"
                    description="Introduction to Calculus"
                    professor="Jane Doe"
                    discussionSection="2A"
                />
      </div>
    );
  }
  else if (output === 'Wishlist Classes'){
    content = (
      <div>
        <p>Wishlist Classes</p>
        <WishlistCourseCard
                    courseName="CS 35L"
                    description="Software Construction Laboratory"
                    professor="Paul Eggert"
                    discussionSection="1E"
                />
                <WishlistCourseCard
                    courseName="MATH 101"
                    description="Introduction to Calculus"
                    professor="Jane Doe"
                    discussionSection="2A"
                />
      </div>
    );
  }
  else {
    content = <div>No content selected</div>;
  }


  return (
    <RootLayout >
      <div id="wrapper">
            <div>
                <button className={styles.profileButton} onClick={() => handleButtonClick('Profile Information')}>Profile Information</button>
                
            </div>
            
            <div>
                <button className={styles.currentButton} onClick={() => handleButtonClick('Current Classes')}>Current Classes</button>
            </div>
            
            <div>
                <button className={styles.wishlistButton} onClick={() => handleButtonClick('Wishlist Classes')}>Wishlist Classes</button>
            </div>

            <div>
                <span className={`{styles.divider} ${styles.flexContainer}`}></span>
            </div>

            <div>
                <span className={styles.outputContainer}>{content}</span>
            </div>
        </div>
    </RootLayout>
  )
}

export default Account;