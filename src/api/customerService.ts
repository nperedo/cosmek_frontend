import api from './config';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface CustomerCreate {
  name: string;
  email: string;
  phone: string;
}

const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const response = await api.get('/api/v1/customers');
    return response.data;
  },
  
  getById: async (id: string | number): Promise<Customer> => {
    const response = await api.get(`/api/v1/customers/${id}`);
    return response.data;
  },
  
  create: async (customerData: CustomerCreate): Promise<Customer> => {
    const response = await api.post('/api/v1/customers', { customer: customerData });
    return response.data;
  }
};

export default customerService;