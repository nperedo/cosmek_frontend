import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import stylistService from '../../api/stylistService';
import { useTheme } from '../../contexts/ThemeContext';

interface StylistFormProps {
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
}

const StylistForm: React.FC<StylistFormProps> = ({ onSuccess }) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await stylistService.create(data);
      
      // Success
      reset();
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create stylist. Please try again.');
      console.error('Error creating stylist:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">
          {error}
        </div>
      )}
      
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
          <span className={isLoading ? 'opacity-0' : ''}>Create Stylist</span>
        </Button>
      </div>
    </form>
  );
};

export default StylistForm;