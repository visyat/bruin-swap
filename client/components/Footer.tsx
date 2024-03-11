// components/Navbar.tsx

import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>BruinSwap</p>
			<p>Built by Rathul, Aditya, Vishal, Matthew, Christian</p>
		</footer>
	);
};

export default Footer;
