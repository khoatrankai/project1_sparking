
import api, { api_formdata } from './api';

const userService = {
  getUsers: async () => {
    const response = await api.get(`/user/all`);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get(`/user/profile`, { withCredentials: true });
    return response.data;
  },
  getUserIDAdmin: async (id:string) => {
    const response = await api.get(`/user/admin/id/${id}`);
    return response.data;
  },
  loginUser: async(data:{email:string,password:string})=>{
    const response = await api.post(`/auth/login`,data, { withCredentials: true });
    return response.data

  },
  createUser: async (createUserInfo:FormData) => {
    const response = await api_formdata.post(`/user/create`,createUserInfo);
    return response.data;
  },
  


};

export default userService;