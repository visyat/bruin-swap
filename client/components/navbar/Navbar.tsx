// components/navbar/Navbar.tsx

import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={styles.topnav}>
			{/* Root */}
			<Link href='/' className={styles.navItem}>
				<p>BruinSwap</p>
			</Link>
			{/* Course search */}
			{/* <div className={styles.course_search}> */}
			<Link href='/search' className={styles.navItem}>
				<span>🔍</span>
				<p>Course Search</p>
			</Link>
			{/* Profile */}
			<Link href='/account' className={styles.navItem}>
				<span>👤</span>
				<p>Account</p>
			</Link>
		</nav>
	);
};

export default Navbar;
