import React from 'react';
import { Calendar, Clock, User, RefreshCcw, X } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { Appointment } from '../../api/appointmentService';
import { useTheme } from '../../contexts/ThemeContext';
import { format } from 'date-fns';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
  onReschedule: (id: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment, 
  onCancel, 
  onReschedule 
}) => {
  const { theme } = useTheme();
  
  // Format appointment time in ChST
  const formattedDate = format(new Date(appointment.time), 'MMM d, yyyy', { timeZone: 'Pacific/Guam' });
  const formattedTime = format(new Date(appointment.time), 'h:mm a', { timeZone: 'Pacific/Guam' });
  
  // Calculate end time
  const endTime = new Date(new Date(appointment.time).getTime() + appointment.duration * 60000);
  const formattedEndTime = format(endTime, 'h:mm a', { timeZone: 'Pacific/Guam' });
  
  // Status badge styles
  const getStatusStyles = () => {
    switch (appointment.status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <Card className={`transition-transform duration-200 ${
      appointment.status === 'cancelled' ? 'opacity-60' : ''
    }`}>
      <CardBody>
        {/* Status Badge */}
        <div className="flex justify-between items-center mb-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyles()}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold mb-3">
          Appointment with {appointment.stylist.name}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-blue-500" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-blue-500" />
            <span>{formattedTime} - {formattedEndTime} ({appointment.duration} mins)</span>
          </div>
          
          <div className="flex items-center">
            <User size={18} className="mr-2 text-blue-500" />
            <span>{appointment.customer.name}</span>
          </div>
        </div>
      </CardBody>
      
      {appointment.status === 'scheduled' && (
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onReschedule(appointment.id)}
          >
            <RefreshCcw size={16} className="mr-1" />
            Reschedule
          </Button>
          
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => onCancel(appointment.id)}
          >
            <X size={16} className="mr-1" />
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentCard;