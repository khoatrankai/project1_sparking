import { CreateGroupCustomer, CreateInfoCustomer, IUpdateCustomerInfo, UpdateGroupCustomer } from '@/models/customerInterface';
import api from './api';

const customerService = {
  getAllCustomer: async () => {
    const response = await api.get(`/customer/get-all-customer?limit=0&page=0`);
    return response.data;
  },
  getAboutCustomer: async () => {
    const response = await api.get(`/customer/get-about-customer`);
    return response.data;
  },
  getGroupCustomer: async () => {
    const response = await api.get(`/customer/get-group-customer`);
    return response.data;
  },
  getCustomerID: async (info_id:string) => {
    const response = await api.get(`/customer/get-customer-id?info_id=${info_id}`);
    return response.data;
  },
  createInfoCustomer: async (data:CreateInfoCustomer) => {
    const response = await api.post(`/customer/create-customer-info`,data);
    return response.data;
  },
  createGroupCustomer: async (data:CreateGroupCustomer) => {
    const response = await api.post(`/customer/create-group-customer`,data);
    return response.data;
  },
  updateGroupCustomer: async (group_id:string,data:UpdateGroupCustomer) => {
    const response = await api.put(`/customer/update-group-customer/${group_id}`,data);
    return response.data;
  },

  updateStatusCustomer: async(data:IUpdateCustomerInfo)=>{
    const res = await api.put('/customer/update-status-customer',data)
    return res.data
  },
  updateCustomerInfo: async(info_id:string,data:IUpdateCustomerInfo)=>{
    console.log(data)
    const res = await api.put('/customer/update-customer-info',{...data,info_id})
    return res.data
  }


};

export default customerService;