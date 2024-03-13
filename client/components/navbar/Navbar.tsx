// components/navbar/Navbar.tsx
'use client';

import Link from 'next/link';
import { makeStyles, shorthands, Tab, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';
import styles from '../../styles/Navbar.module.css';
import { useEffect, useState } from 'react';

const Navbar = (props: Partial<TabListProps>) => {
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		setToken(token);
	}, []);

	return (
		<nav className={styles.topnav}>
			{/* Root */}
			<Link href='/' className={styles.navItem}>
				<p>BruinSwap</p>
			</Link>
			{/* Course search */}
			{/* <div className={styles.course_search}> */}
			<Link href='/listings/search' className={styles.navItem}>
				<span>🔍</span>
				<p>Course Search</p>
			</Link>
			{/* Profile */}
			<Link href='/listing' className={styles.navItem}>
				<span>➕</span>
				<p>Add Listing</p>
			</Link>
			<Link href='/account' className={styles.navItem}>
				<span>👤</span>
				<p>Account</p>
			</Link>
			{token ? (
				<Link href='/logout' className={styles.navItem}>
					<span>👋</span>
					<p>Logout</p>
				</Link>
			) : (
				<Link href='/login' className={styles.navItem}>
					<span>👋</span>
					<p>Login</p>
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
