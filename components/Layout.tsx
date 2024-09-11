import Head from 'next/head';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Adarsh Dabral - Portfolio' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        © {new Date().getFullYear()} Adarsh Dabral. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;