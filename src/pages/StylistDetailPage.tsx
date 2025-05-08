import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import AppointmentCard from '../components/appointment/AppointmentCard';
import stylistService, { Stylist } from '../api/stylistService';
import appointmentService, { Appointment } from '../api/appointmentService';
import { useTheme } from '../contexts/ThemeContext';

const StylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [stylist, setStylist] = useState<Stylist | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStylistData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch stylist details
        const stylistData = await stylistService.getById(id);
        setStylist(stylistData);
        
        // Fetch all appointments and filter by stylist
        const allAppointments = await appointmentService.getAll();
        const stylistAppointments = allAppointments.filter(
          appointment => appointment.stylist.id === parseInt(id)
        );
        setAppointments(stylistAppointments);
      } catch (err) {
        setError('Failed to load stylist details. Please try again later.');
        console.error('Error fetching stylist details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStylistData();
  }, [id]);
  
  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      await appointmentService.cancel(appointmentId);
      
      // Update appointments list
      setAppointments(appointments.map(appointment => {
        if (appointment.id === appointmentId) {
          return { ...appointment, status: 'cancelled' };
        }
        return appointment;
      }));
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      alert('Failed to cancel appointment. Please try again.');
    }
  };
  
  const handleRescheduleAppointment = (appointmentId: number) => {
    // In a real app, you'd open a modal or navigate to a reschedule page
    alert('Reschedule functionality would open a modal here.');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !stylist) {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
        {error || 'Stylist not found'}
      </div>
    );
  }
  
  // Filter appointments by status
  const upcomingAppointments = appointments.filter(
    appointment => appointment.status === 'scheduled'
  );
  
  const pastAppointments = appointments.filter(
    appointment => appointment.status === 'completed' || appointment.status === 'cancelled'
  );
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/stylists" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
          <ArrowLeft size={16} className="mr-1" />
          Back to Stylists
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stylist Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <div className={`h-48 flex items-center justify-center ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              {/* Placeholder stylist image */}
              <span className="text-6xl">💇‍♂️</span>
            </div>
            
            <CardBody>
              <h1 className="text-2xl font-bold mb-4">{stylist.name}</h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Mail size={18} className="text-blue-500" />
                  <span>{stylist.email}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-blue-500" />
                  <span>9:00 AM - 6:00 PM</span>
                </div>
              </div>
              
              <Link to={`/book-appointment/${stylist.id}`}>
                <Button fullWidth>
                  <Calendar size={16} className="mr-2" />
                  Book Appointment
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
        
        {/* Appointments */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming appointments */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No upcoming appointments scheduled.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {upcomingAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                    onReschedule={handleRescheduleAppointment}
                  />
                ))}
              </div>
            )}
          </section>
          
          {/* Past appointments */}
          {pastAppointments.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Past Appointments</h2>
              <div className="grid grid-cols-1 gap-4">
                {pastAppointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                    onReschedule={handleRescheduleAppointment}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default StylistDetailPage;