import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import AppointmentForm from '../components/appointment/AppointmentForm';

const BookAppointmentPage: React.FC = () => {
  const { stylistId } = useParams<{ stylistId?: string }>();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  
  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/appointments');
    }, 2000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/appointments" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
          <ArrowLeft size={16} className="mr-1" />
          Back to Appointments
        </Link>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Book an Appointment</h1>
        </CardHeader>
        <CardBody>
          {success ? (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900 dark:text-green-300">
              Appointment booked successfully! Redirecting...
            </div>
          ) : (
            <AppointmentForm stylistId={stylistId} onSuccess={handleSuccess} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default BookAppointmentPage;