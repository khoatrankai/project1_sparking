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


};

export default systemService;