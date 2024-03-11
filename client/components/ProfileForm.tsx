import { useState } from "react";
import styles from '../styles/Edit.module.css';


function ProfileForm(props: { email: any; fullName: any; major: any; gradYear: any; }) {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(props.email);
  const [fullName, setFullName] = useState(props.fullName);
  const [major, setMajor] = useState(props.major);
  const [gradYear, setGradYear] = useState(props.gradYear);

  const handleEditClick = () => {
      setEditing(true);
  };

  const handleSaveClick = () => {
      setEditing(false);
      // Call a function to handle saving changes
      // For simplicity, let's just log the changes
      console.log('Saved changes:', { email, fullName, major, gradYear });
  };

  const handleKeyPress = (e: { key: string; }) => {
      if (e.key === 'Enter') {
          handleSaveClick();
      }
  };

  return (
    <div id="wrapper" style={{ maxWidth: '600px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '20px' }}>Profile Information</h2>
        <div className="profile-field-container" style={{ marginBottom: '20px' }}>
            <div className="profile-field" style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Email: </label>
                {editing ? (
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
                ) : (
                    <p style={{ margin: '0' }}>{email}</p>
                )}
                <button onClick={handleEditClick} className={styles.button} style={{ marginLeft: '10px' }}>Edit</button>
            </div>
        </div>
        <div className="profile-field-container" style={{ marginBottom: '20px' }}>
            <div className="profile-field" style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Full Name: </label>
                {editing ? (
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} onKeyPress={handleKeyPress} />
                ) : (
                    <p style={{ margin: '0' }}>{fullName}</p>
                )}
                <button onClick={handleEditClick} className={styles.button} style={{ marginLeft: '10px' }}>Edit</button>
            </div>
        </div>
        <div className="profile-field-container" style={{ marginBottom: '20px' }}>
            <div className="profile-field" style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Major: </label>
                {editing ? (
                    <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} onKeyPress={handleKeyPress} />
                ) : (
                    <p style={{ margin: '0' }}>{major}</p>
                )}
                <button onClick={handleEditClick} className={styles.button} style={{ marginLeft: '10px' }}>Edit</button>
            </div>
        </div>
        <div className="profile-field-container" style={{ marginBottom: '20px' }}>
            <div className="profile-field" style={{ display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Graduation Year: </label>
                {editing ? (
                    <input type="text" value={gradYear} onChange={(e) => setGradYear(e.target.value)} onKeyPress={handleKeyPress} />
                ) : (
                    <p style={{ margin: '0' }}>{gradYear}</p>
                )}
                <button onClick={handleEditClick} className={styles.button} style={{ marginLeft: '10px' }}>Edit</button>
            </div>
        </div>
        {editing && <button onClick={handleSaveClick}>Save</button>}
    </div>
);

}

export default ProfileForm;