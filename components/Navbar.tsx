import { useState, useCallback } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  }, []);

  return (
    <nav className="bg-gray-800 text-white py-4 fixed w-full z-10 ">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Adarsh Dabral
        </Link>
        <ul className="flex space-x-4">
          {['home', 'about', 'projects', 'contact'].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`hover:text-blue-300 transition-colors ${
                  activeSection === section ? 'text-blue-300' : ''
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;