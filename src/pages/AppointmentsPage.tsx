import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import AppointmentCard from '../components/appointment/AppointmentCard';
import appointmentService, { Appointment } from '../api/appointmentService';
import { useTheme } from '../contexts/ThemeContext';

type FilterStatus = 'all' | 'scheduled' | 'completed' | 'cancelled';

const AppointmentsPage: React.FC = () => {
  const { theme } = useTheme();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const data = await appointmentService.getAll();
        setAppointments(data);
        setFilteredAppointments(data);
      } catch (err) {
        setError('Failed to load appointments. Please try again later.');
        console.error('Error fetching appointments:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(appointment => appointment.status === filterStatus)
      );
    }
  }, [filterStatus, appointments]);
  
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
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Appointments</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Filter buttons */}
          <div className={`inline-flex items-center rounded-md shadow-sm ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          }`}>
            <button
              className={`px-4 py-2 text-sm first:rounded-l-md last:rounded-r-md ${
                filterStatus === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button
              className={`px-4 py-2 text-sm first:rounded-l-md last:rounded-r-md ${
                filterStatus === 'scheduled' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilterStatus('scheduled')}
            >
              Scheduled
            </button>
            <button
              className={`px-4 py-2 text-sm first:rounded-l-md last:rounded-r-md ${
                filterStatus === 'completed' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
            <button
              className={`px-4 py-2 text-sm first:rounded-l-md last:rounded-r-md ${
                filterStatus === 'cancelled' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setFilterStatus('cancelled')}
            >
              Cancelled
            </button>
          </div>
          
          <Link to="/book-appointment" className="inline-block">
            <Button>
              <Calendar size={20} className="mr-2" />
              Book New
            </Button>
          </Link>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No appointments found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {filterStatus === 'all' 
              ? 'You have no appointments. Book your first appointment now!' 
              : `No ${filterStatus} appointments found.`}
          </p>
          {filterStatus === 'all' && (
            <Link to="/book-appointment">
              <Button>Book Your First Appointment</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancelAppointment}
              onReschedule={handleRescheduleAppointment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;