import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Button from '../ui/Button';
import stylistService, { Stylist } from '../../api/stylistService';
import customerService from '../../api/customerService';
import appointmentService from '../../api/appointmentService';
import { useTheme } from '../../contexts/ThemeContext';

interface AppointmentFormProps {
  stylistId?: string;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  stylistId: string;
  date: string;
  time: string;
  duration: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ 
  stylistId, 
  onSuccess 
}) => {
  const { theme } = useTheme();
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors }, 
    setValue,
    reset
  } = useForm<FormData>({
    defaultValues: {
      stylistId: stylistId || '',
      duration: '60'
    }
  });
  
  const selectedStylistId = watch('stylistId');
  const selectedDate = watch('date');
  const selectedDuration = watch('duration');
  
  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const data = await stylistService.getAll();
        setStylists(data);
      } catch (err) {
        setError('Failed to load stylists. Please try again later.');
        console.error('Error fetching stylists:', err);
      }
    };
    
    fetchStylists();
  }, []);
  
  useEffect(() => {
    if (selectedStylistId && selectedDate) {
      const fetchAvailability = async () => {
        try {
          setIsLoading(true);
          const slots = await stylistService.getAvailability(
            selectedStylistId, 
            selectedDate,
            parseInt(selectedDuration)
          );
          setAvailableSlots(slots);
        } catch (err) {
          setError('Failed to load available slots. Please try again later.');
          console.error('Error fetching availability:', err);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAvailability();
    }
  }, [selectedStylistId, selectedDate, selectedDuration]);
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const customerData = {
        name: data.name,
        email: data.email,
        phone: data.phone
      };
      
      const customer = await customerService.create(customerData);
      
      const timeInChST = `${data.date}T${data.time}:00+10:00`;
      
      const appointmentData = {
        customer_id: customer.id,
        stylist_id: parseInt(data.stylistId),
        time: timeInChST,
        duration: parseInt(data.duration),
        status: 'scheduled'
      };
      
      await appointmentService.create(appointmentData);
      
      reset();
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.errors?.join(', ') || err.response?.data?.error || 'Failed to book appointment.');
      console.error('Error booking appointment:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatTimeSlot = (timeString: string) => {
    return format(new Date(timeString), 'h:mm a', { timeZone: 'Pacific/Guam' });
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      )}
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Name
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Phone
            </label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Appointment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Select Stylist
            </label>
            <select
              {...register('stylistId', { required: 'Stylist is required' })}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select a stylist</option>
              {stylists.map(stylist => (
                <option key={stylist.id} value={stylist.id}>{stylist.name}</option>
              ))}
            </select>
            {errors.stylistId && (
              <p className="mt-1 text-sm text-red-600">{errors.stylistId.message}</p>
            )}
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Service Duration
            </label>
            <select
              {...register('duration', { required: 'Duration is required' })}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="60">60 minutes</option>
            </select>
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
            )}
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Date
            </label>
            <input
              type="date"
              {...register('date', { required: 'Date is required' })}
              min={new Date().toISOString().split('T')[0]}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Time Slot
            </label>
            <select
              {...register('time', { required: 'Time slot is required' })}
              disabled={!selectedStylistId || !selectedDate || availableSlots.length === 0}
              className={`block w-full px-4 py-2 border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">
                {!selectedStylistId || !selectedDate 
                  ? 'Select stylist and date first' 
                  : isLoading 
                    ? 'Loading available slots...' 
                    : availableSlots.length === 0 
                      ? 'No slots available' 
                      : 'Select a time slot'}
              </option>
              {availableSlots.map((slot, index) => {
                const dateTime = new Date(slot);
                const timeString = dateTime.toLocaleTimeString('en-US', { 
                  hour12: false, 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  timeZone: 'Pacific/Guam'
                });
                return (
                  <option key={index} value={timeString}>
                    {formatTimeSlot(slot)}
                  </option>
                );
              })}
            </select>
            {errors.time && (
              <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="relative"
        >
          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          )}
          <span className={isLoading ? 'opacity-0' : ''}>Book Appointment</span>
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;