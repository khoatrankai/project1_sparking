import api from './api';

const systemService = {
  getProvinces: async () => {
    const response = await api.get(`/system/provinces`);
    return response.data;
  },
  getVats: async () => {
    const response = await api.get(`/system/vats`);
    return response.data;
  },
  getProfits: async () => {
    const response = await api.get(`/system/profits`);
    return response.data;
  },


};

export default systemService;