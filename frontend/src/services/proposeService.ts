import { CreatePropose, FilterPropose } from '@/models/proposeInterface';
import api from './api';

const proposeService = {
  createPropose: async (data:CreatePropose) => {
    const response = await api.post(`/propose`,{...data,price:Number(data.price)});
    return response.data;
  },
  getFilterPropose: async (filterPropose:FilterPropose) => {
    const response = await api.get(`/propose/get-filter?${filterPropose.type?`type=${filterPropose.type}`:''}${filterPropose.type_date ? `&type_date=${filterPropose.type_date}` : ''}${filterPropose.status ? `&status=${filterPropose.status}` : ''}${filterPropose.date_start ? `&date_start=${filterPropose.date_start}` : ''}${filterPropose.date_end ? `&date_end=${filterPropose.date_end}` : ''}${filterPropose.staff_support ? `&staff_support=${filterPropose.staff_support}` : ''}`);
    return response.data;
  },


};

export default proposeService;