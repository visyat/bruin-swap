import { useState } from "react";
import styles from '../styles/Profile.module.css';

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
      <div id="wrapper">
          <h2>Profile Information</h2>
          <div>
              <label>Email: </label>
              {editing ? (
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
              ) : (
                  <p>{email}</p>
              )}
              <button onClick={handleEditClick}>Edit</button>
          </div>
          <div>
              <label>Full Name: </label>
              {editing ? (
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} onKeyPress={handleKeyPress} />
              ) : (
                  <p>{fullName}</p>
              )}
              <button onClick={handleEditClick}>Edit</button>
          </div>
          <div>
              <label>Major: </label>
              {editing ? (
                  <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} onKeyPress={handleKeyPress} />
              ) : (
                  <p>{major}</p>
              )}
              <button onClick={handleEditClick}>Edit</button>
          </div>
          <div>
              <label>Graduation Year: </label>
              {editing ? (
                  <input type="text" value={gradYear} onChange={(e) => setGradYear(e.target.value)} onKeyPress={handleKeyPress} />
              ) : (
                  <p>{gradYear}</p>
              )}
              <button onClick={handleEditClick}>Edit</button>
          </div>
          {editing && <button onClick={handleSaveClick}>Save</button>}
      </div>
  );
}

export default ProfileForm;