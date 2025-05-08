import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import StylistForm from '../components/stylist/StylistForm';

const CreateStylistPage: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  
  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/stylists');
    }, 2000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/stylists" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
          <ArrowLeft size={16} className="mr-1" />
          Back to Stylists
        </Link>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add New Stylist</h1>
        </CardHeader>
        <CardBody>
          {success ? (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-300">
              Stylist created successfully! Redirecting...
            </div>
          ) : (
            <StylistForm onSuccess={handleSuccess} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateStylistPage;