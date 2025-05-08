import api from './config';
import { Stylist } from './stylistService';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: number;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  customer: Customer;
  stylist: Stylist;
}

export interface AppointmentCreate {
  time: string;
  duration: number;
  customer_id: number;
  stylist_id: number;
  status?: 'scheduled' | 'completed' | 'cancelled';
}

export interface CustomerCreate {
  name: string;
  email: string;
  phone: string;
}

const appointmentService = {
  // Get all appointments
  getAll: async (): Promise<Appointment[]> => {
    const response = await api.get('/api/v1/appointments');
    return response.data;
  },
  
  // Get a single appointment by ID
  getById: async (id: string | number): Promise<Appointment> => {
    const response = await api.get(`/api/v1/appointments/${id}`);
    return response.data;
  },
  
  // Create a new appointment
  create: async (appointmentData: AppointmentCreate): Promise<Appointment> => {
    const response = await api.post('/api/v1/appointments', appointmentData);
    return response.data;
  },
  
  // Cancel an appointment
  cancel: async (id: string | number): Promise<{ message: string }> => {
    const response = await api.post(`/api/v1/appointments/${id}/cancel`);
    return response.data;
  },
  
  // Reschedule an appointment
  reschedule: async (id: string | number, newTime: string): Promise<Appointment> => {
    const response = await api.post(`/api/v1/appointments/${id}/reschedule`, { 
      new_time: newTime 
    });
    return response.data;
  }
};

export default appointmentService;