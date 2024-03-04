import RootLayout from '../app/layout';
import styles from '../styles/Account.module.css';
import React, { useState } from 'react';


const Account = () => {

  const [content, setContent] = useState('');
  const populateContent = () => {
    // Update the content state
    setContent('This is the dynamically populated content.');
  };
  return (
    <RootLayout >
      <div id="content">
                {/* Render the dynamic content */}
                {content && <p>{content}</p>}
            </div>
      <div>
        <button className={styles.profileButton} onClick={populateContent}>Profile Information</button>
      </div>
      
      <div>
        <button className={styles.currentButton}>Current Classes</button>
      </div>
      
      <div>
        <button className={styles.wishlistButton}>Wishlist Classes</button>
      </div>

      <div>
        <span className={styles.divider}> </span>
      </div>

    </RootLayout>
  )
}

export default Account;