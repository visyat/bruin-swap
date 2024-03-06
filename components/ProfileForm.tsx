import { useState } from "react";
import styles from '../styles/Profile.module.css';

const ProfileForm = () => {
    const [profileInfo, setProfileInfo] = useState({
        email: '',
        fullName: '',
        major: '',
        graduationYear: ''
      });
      
      
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
          setProfileInfo(prevProfileInfo => ({
            ...prevProfileInfo,
            [fieldName]: event.target.value
          }));
        };
    return (
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
    )

}
export default ProfileForm;