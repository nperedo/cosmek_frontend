import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-8 ${
      theme === 'dark' 
        ? 'bg-gray-800 text-gray-300' 
        : 'bg-gray-100 text-gray-700'
    } transition-colors duration-300`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">COSMEK.BEAUTY</h3>
            <p className="mb-4">Premium salon services for everyone.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-500 transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="/stylists" className="hover:text-blue-500 transition-colors duration-200">Our Stylists</a>
              </li>
              <li>
                <a href="/appointments" className="hover:text-blue-500 transition-colors duration-200">Book Appointment</a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-500 transition-colors duration-200">About Us</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="mb-2">671 Cosmek Street</p>
              <p className="mb-2">Barrigada, GU 96913</p>
              <p className="mb-2">Phone: (671) 671-0671</p>
              <p>Email: info@cosmekbeauty.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p>&copy; {currentYear} COSMEK.BEAUTY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;