import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gray-800 text-gray-100' 
        : 'bg-white text-gray-900'
    } transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  className = '' 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`px-6 py-4 border-b ${
      theme === 'dark' 
        ? 'border-gray-700' 
        : 'border-gray-200'
    } transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  className = '' 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`px-6 py-4 border-t ${
      theme === 'dark' 
        ? 'border-gray-700' 
        : 'border-gray-200'
    } transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;