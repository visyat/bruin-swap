import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/Account.module.css';
import ClassCardAccount from '../components/ClassCardAccount';
import ProfileForm from '../components/ProfileForm';
import ClassCardWishlist from '../components/ClassCardWishlist';
import { useRouter } from 'next/router';

const Account = () => {
	const router = useRouter();

	// LOGINPROTECTTODO
	if (false) {
		router.push('/login');
	}

	const [output, setOutput] = useState('');

	const handleButtonClick = (text: string) => {
		setOutput(text);
	};

	let content;
	if (output === 'Profile Information') {
		content = (
			<ProfileForm
				email='someone@example.com'
				fullName='Someone Something'
				major='Electrical Engineering'
				gradYear='2023'
			/>
		);
	} else if (output === 'Current Classes') {
		content = (
			<div>
				<p>Current Classes</p>
				<ClassCardAccount
					data={{
						classDept: 'COM SCI',
						classNum: '35L',
						classTitle: 'Software Construction Labroatory',
						instructor: 'Eggert, P.',
						lecture: '3A',
					}}
				/>
				<ClassCardAccount
					data={{
						classDept: 'COM SCI',
						classNum: '32',
						classTitle: 'Intro to CS II',
						instructor: 'Eggert, P.',
						lecture: '3A',
					}}
				/>
			</div>
		);
	} else if (output === 'Wishlist Classes') {
		content = (
			<div>
				<p>Wishlist Classes</p>
				<ClassCardWishlist
					data={{
						classDept: 'COM SCI',
						classNum: '260B',
						classTitle: 'Algorithmic Machine Learning',
						instructor: 'Eggert, P.',
						lecture: '3A',
					}}
				/>
				<ClassCardWishlist
					data={{
						classDept: 'COM SCI',
						classNum: '260C',
						classTitle: 'Algorithmic Machine Learning',
						instructor: 'Eggert, P.',
						lecture: '3A',
					}}
				/>
			</div>
		);
	} else {
		content = <div>No content selected</div>;
	}

	return (
		<div id='wrapper'>
			<div>
				<button
					className={styles.profileButton}
					onClick={() => handleButtonClick('Profile Information')}
				>
					Profile Information
				</button>
			</div>

			<div>
				<button
					className={styles.currentButton}
					onClick={() => handleButtonClick('Current Classes')}
				>
					Current Classes
				</button>
			</div>

			<div>
				<button
					className={styles.wishlistButton}
					onClick={() => handleButtonClick('Wishlist Classes')}
				>
					Wishlist Classes
				</button>
			</div>

			<div>
				<span className={[styles.divider, styles.flexContainer]}></span>
			</div>

			<div>
				<span className={styles.outputContainer}>{content}</span>
			</div>
		</div>
	);
};

export default Account;
