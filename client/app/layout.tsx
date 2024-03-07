import { Inter } from 'next/font/google';
import '../app/globals.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => (
  <div>
      <div className="content">
        <Navbar />
        {children}
        <Footer />
      </div>
  </div>
);

export default RootLayout;
