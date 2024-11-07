import api from './api';

const userService = {
  getUsers: async () => {
    const response = await api.get(`/user/all`);
    return response.data;
  },
  


};

export default userService;