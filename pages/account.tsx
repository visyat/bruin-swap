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
      <div>
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
      <div className={styles.courseCard}>
        <div className={styles.courseName}>HIST 11B</div>
      </div>
    );
  }
  
  else {
    content = <div>No content selected</div>;
  }


  return (
    <RootLayout >
      <div>
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