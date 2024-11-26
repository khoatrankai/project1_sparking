import { ICreateContract, ICreatePayment, ICreateTypeContract, ICreateTypeMethod, IUpdateContract, IUpdatePayment, IUpdateTypeContract, IUpdateTypeMethod } from '@/models/contractInterface';
import api from './api'; // Ensure `api` is your Axios instance configured with baseURL and interceptors

const contractService = {
  // Get all contracts
  getContracts: async () => {
    const response = await api.get(`/contract/all`);
    return response.data;
  },
  getContract: async (id:string) => {
    const response = await api.get(`/contract/id/${id}`);
    return response.data;
  },

  // Create a new contract
  createContract: async (data: ICreateContract) => {
    const response = await api.post(`/contract/create`, data);
    return response.data;
  },

  // Update an existing contract
  updateContract: async (id: string, data: IUpdateContract) => {
    const response = await api.put(`/contract/update/${id}`, data);
    return response.data;
  },
  getTypeContracts: async () => {
    const response = await api.get(`/contract/type-contract`);
    return response.data;
  },
  // Create a new type contract
  createTypeContract: async (data: ICreateTypeContract) => {
    const response = await api.post(`/contract/type-contract`, data);
    return response.data;
  },

  // Update a type contract
  updateTypeContract: async (id: string, data: IUpdateTypeContract) => {
    const response = await api.put(`/contract/type-contract/${id}`, data);
    return response.data;
  },

  // Create a new payment
  createPayment: async (data: ICreatePayment) => {
    const response = await api.post(`/contract/payment`, data);
    return response.data;
  },

  // Update an existing payment
  updatePayment: async (id: string, data: IUpdatePayment) => {
    const response = await api.put(`/contract/payment/${id}`, data);
    return response.data;
  },

  // Get all payments
  getAllPayments: async () => {
    const response = await api.get(`/contract/payment`);
    return response.data;
  },

  // Create a new type method
  createTypeMethod: async (data: ICreateTypeMethod) => {
    const response = await api.post(`/contract/type-method`, data);
    return response.data;
  },

  // Update an existing type method
  updateTypeMethod: async (id: string, data: IUpdateTypeMethod) => {
    const response = await api.put(`/contract/type-method/${id}`, data);
    return response.data;
  },

  // Get all type methods
  getAllTypeMethods: async () => {
    const response = await api.get(`/contract/type-method`);
    return response.data;
  },

  // Get a welcome message (optional)
 
};

export default contractService;
