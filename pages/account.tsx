import { useState } from 'react';
import RootLayout from '../app/layout';
import styles from '../styles/Account.module.css';


const Account = () => {
  const [output, setOutput] = useState('');
  const [profileInfo, setProfileInfo] = useState({
    email: '',
    fullName: '',
    major: '',
    graduationYear: ''
  });

  const handleButtonClick = (text: string) => {
    setOutput(text);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setProfileInfo(prevProfileInfo => ({
      ...prevProfileInfo,
      [fieldName]: event.target.value
    }));
  };

  let content;
  if (output === 'Profile Information') {
    content = (
      <div id="wrapper">
        <h2>Profile Information</h2>
        <div>
          <label>Email: </label>
          <input type="email" className={styles.inputForm} value={profileInfo.email}  
          onChange={(e) => handleInputChange(e, 'email')} 
          placeholder='Enter Email...'/>
        </div>
        <div className={styles.spacing}>
          <label>Full Name: </label>
          <input type="text" className={styles.inputForm} value={profileInfo.fullName}  
          onChange={(e) => handleInputChange(e, 'fullName')} 
          placeholder = 'Full Name...'/>
         
        </div>
        <div className={styles.spacing}>
          <label>Major: </label>
          <input type="text" className={styles.inputForm} value={profileInfo.major} 
          onChange={(e) => handleInputChange(e, 'major')} 
          placeholder = 'Enter Major...' />
        </div>
        <div className={styles.spacing}> 
          <label>Graduation Year: </label>
          <input type="number" className={styles.inputForm} 
          value={profileInfo.graduationYear} onChange={(e) => handleInputChange(e, 'graduationYear')}
          placeholder = 'Enter Grad Year...' />
        </div>
      </div>
    );
  } 

  else if(output === 'Current Classes'){
    content = (
      <div className={styles.courseCard} id="wrapper">
        <div className={styles.courseName}>HIST 1A</div>
        <div className={styles.courseName}>Introduction to Western Civilization: Ancient Civilizations from Prehistory to Circa A.D. 843</div>
        <div className={styles.professor}>
          Professor:
          <p>Adriana Vasquez</p>
        </div>
        <div>
           <h1 className={styles.discussion}>Discussion Section: </h1>
          <p className={styles.sectionHighlight}>1E</p>
          </div>
      </div>
    );
  }
  else if (output === 'Wishlist Classes'){
    content = (
      <div className={styles.courseCard} id="wrapper">
        <div className={styles.courseName}>HIST 1A</div>
        <div className={styles.courseName}>Introduction to Western Civilization: Ancient Civilizations from Prehistory to Circa A.D. 843</div>
        <div className={styles.professor}>
          Professor:
          <p>Adriana Vasquez</p>
        </div>
        <div>
           <h1 className={styles.discussion}>Discussion Section: </h1>
          <p className={styles.sectionHighlight}>1E</p>
          </div>
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
                <span className={styles.divider}></span>
            </div>

            <div>
                <span className={styles.outputContainer}>{content}</span>
            </div>
        </div>
    </RootLayout>
  )
}

export default Account;