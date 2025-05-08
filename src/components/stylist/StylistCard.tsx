import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Stylist } from '../../api/stylistService';
import { useTheme } from '../../contexts/ThemeContext';

interface StylistCardProps {
  stylist: Stylist;
}

const StylistCard: React.FC<StylistCardProps> = ({ stylist }) => {
  const { theme } = useTheme();
  
  return (
    <Card className="h-full flex flex-col transition-transform duration-200 hover:transform hover:scale-105">
      <div className={`h-48 flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        {/* Placeholder stylist image - in a real app, you'd use actual photos */}
        <span className="text-6xl">💇‍♂️</span>
      </div>
      
      <CardBody className="flex-grow">
        <h3 className="text-xl font-bold mb-2">{stylist.name}</h3>
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mb-4">
          <Mail size={16} />
          <span>{stylist.email}</span>
        </div>
        <p className={`mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Professional stylist specializing in men's cuts and grooming.
        </p>
      </CardBody>
      
      <CardFooter className="flex justify-between">
        <Link to={`/stylists/${stylist.id}`}>
          <Button variant="outline">View Profile</Button>
        </Link>
        <Link to={`/book-appointment/${stylist.id}`}>
          <Button>
            <Calendar size={16} className="mr-2" />
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StylistCard;