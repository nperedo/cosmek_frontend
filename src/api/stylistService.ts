import api from './config';

export interface Stylist {
  id: number;
  name: string;
  email: string;
}

export interface StylistCreate {
  name: string;
  email: string;
}

const stylistService = {
  // Get all stylists
  getAll: async (): Promise<Stylist[]> => {
    const response = await api.get('/api/v1/stylists');
    return response.data;
  },
  
  // Get a single stylist by ID
  getById: async (id: string | number): Promise<Stylist> => {
    const response = await api.get(`/api/v1/stylists/${id}`);
    return response.data;
  },
  
  // Create a new stylist
  create: async (stylistData: StylistCreate): Promise<Stylist> => {
    const response = await api.post('/api/v1/stylists', stylistData);
    return response.data;
  },
  
  // Get stylist availability for a specific date
  getAvailability: async (id: string | number, date: string, duration = 60): Promise<string[]> => {
    const response = await api.get(`/api/v1/stylists/${id}/availability`, {
      params: { date, duration }
    });
    return response.data.available_slots;
  }
};

export default stylistService;