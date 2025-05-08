import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import Button from '../components/ui/Button';
import StylistCard from '../components/stylist/StylistCard';
import stylistService, { Stylist } from '../api/stylistService';

const StylistsPage: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStylists = async () => {
      try {
        setIsLoading(true);
        const data = await stylistService.getAll();
        setStylists(data);
      } catch (err) {
        setError('Failed to load stylists. Please try again later.');
        console.error('Error fetching stylists:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStylists();
  }, []);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Stylists</h1>
        <Link to="/stylists/new">
          <Button>
            <UserPlus size={20} className="mr-2" />
            Add Stylist
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      ) : stylists.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No stylists found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            There are no stylists available at the moment.
          </p>
          <Link to="/stylists/new">
            <Button>Add Your First Stylist</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stylists.map(stylist => (
            <StylistCard key={stylist.id} stylist={stylist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StylistsPage;