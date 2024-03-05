import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/navbar/Navbar';

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => (
  <div>
      <Navbar />
      {children}
  </div>
);

export default RootLayout;
