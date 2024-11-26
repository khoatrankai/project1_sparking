
// import { ApiResponse } from '@/models/responseInterface';
import api from './api'; // Ensure `api` is your Axios instance configured with baseURL and interceptors
import { ICreateActivity, ICreateListCodeProduct, ICreateListUser, ICreatePictureActivity, ICreatePictureWork, ICreateStatusActivity, ICreateStatusWork, ICreateTypeActivity, ICreateTypeWork, ICreateWork, IUpdateActivity, IUpdateListCodeProduct, IUpdateListUser, IUpdatePictureActivity, IUpdatePictureWork, IUpdateStatusActivity, IUpdateStatusWork, IUpdateTypeActivity, IUpdateTypeWork, IUpdateWork } from '@/models/activityInterface';

const activityService = {
  getAllActivities: async () => {
    const response = await api.get('/activity/all');
    return response.data;
  },
  getActivityById: async (id: string) => {
    const response = await api.get(`/activity/id/${id}`);
    return response.data;
  },
  createActivity: async (data: ICreateActivity) => {
    const response = await api.post('/activity/create', data);
    return response.data;
  },
  updateActivity: async (id: string, data: IUpdateActivity) => {
    const response = await api.put(`/activity/update/${id}`, data);
    return response.data;
  },
  updateStatus: async (id: string, data: IUpdateActivity) => {
    const response = await api.put(`/activity/update/status/${id}`, data);
    return response.data;
  },
  deleteActivity: async (id: string) => {
    const response = await api.delete(`/activity/activities/${id}`);
    return response.data;
  },

  // ListCodeProduct Methods
  getAllListCodeProducts: async () => {
    const response = await api.get('/activity/list-code-products');
    return response.data;
  },
  getListCodeProductById: async (id: string) => {
    const response = await api.get(`/activity/list-code-products/${id}`);
    return response.data;
  },
  createListCodeProduct: async (data: ICreateListCodeProduct) => {
    const response = await api.post('/activity/list-code-products', data);
    return response.data;
  },
  updateListCodeProduct: async (id: string, data: IUpdateListCodeProduct) => {
    const response = await api.put(`/activity/list-code-products/${id}`, data);
    return response.data;
  },
  deleteListCodeProduct: async (id: string) => {
    const response = await api.delete(`/activity/list-code-products/${id}`);
    return response.data;
  },

  // ListUser Methods
  getAllListUsers: async () => {
    const response = await api.get('/activity/list-users');
    return response.data;
  },
  getListUserById: async (id: string) => {
    const response = await api.get(`/activity/list-users/${id}`);
    return response.data;
  },
  createListUser: async (data: ICreateListUser) => {
    const response = await api.post('/activity/list-users', data);
    return response.data;
  },
  updateListUser: async (id: string, data: IUpdateListUser) => {
    const response = await api.put(`/activity/list-users/${id}`, data);
    return response.data;
  },
  deleteListUser: async (id: string) => {
    const response = await api.delete(`/activity/list-users/${id}`);
    return response.data;
  },

  // PictureActivity Methods
  getAllPictureActivities: async () => {
    const response = await api.get('/activity/pictures-activity');
    return response.data;
  },
  getPictureActivityById: async (id: string) => {
    const response = await api.get(`/activity/pictures-activity/${id}`);
    return response.data;
  },
  createPictureActivity: async (data: ICreatePictureActivity) => {
    const response = await api.post('/activity/pictures-activity', data);
    return response.data;
  },
  updatePictureActivity: async (id: string, data: IUpdatePictureActivity) => {
    const response = await api.put(`/activity/pictures-activity/${id}`, data);
    return response.data;
  },
  deletePictureActivity: async (id: string) => {
    const response = await api.delete(`/activity/pictures-activity/${id}`);
    return response.data;
  },

  // PictureWork Methods
  getAllPictureWorks: async () => {
    const response = await api.get('/activity/pictures-work');
    return response.data;
  },
  getPictureWorkById: async (id: string) => {
    const response = await api.get(`/activity/pictures-work/${id}`);
    return response.data;
  },
  createPictureWork: async (data: ICreatePictureWork) => {
    const response = await api.post('/activity/pictures-work', data);
    return response.data;
  },
  updatePictureWork: async (id: string, data: IUpdatePictureWork) => {
    const response = await api.put(`/activity/pictures-work/${id}`, data);
    return response.data;
  },
  deletePictureWork: async (id: string) => {
    const response = await api.delete(`/activity/pictures-work/${id}`);
    return response.data;
  },

  // TypeWork Methods
  getAllTypeWorks: async () => {
    const response = await api.get('/activity/type-work/all');
    return response.data;
  },
  getTypeWorkById: async (id: string) => {
    const response = await api.get(`/activity/type-work/${id}`);
    return response.data;
  },
  createTypeWork: async (data: ICreateTypeWork) => {
    const response = await api.post('/activity/type-work/create', data);
    return response.data;
  },
  updateTypeWork: async (id: string, data: IUpdateTypeWork) => {
    const response = await api.put(`/activity/type-work/update/${id}`, data);
    return response.data;
  },
  deleteTypeWork: async (id: string) => {
    const response = await api.delete(`/activity/type-work/${id}`);
    return response.data;
  },

  // StatusWork Methods
  getAllStatusWorks: async () => {
    const response = await api.get('/activity/status-work/all');
    return response.data;
  },
  getStatusWorkById: async (id: string) => {
    const response = await api.get(`/activity/status-work/update/${id}`);
    return response.data;
  },
  createStatusWork: async (data: ICreateStatusWork) => {
    const response = await api.post('/activity/status-work/create', data);
    return response.data;
  },
  updateStatusWork: async (id: string, data: IUpdateStatusWork) => {
    const response = await api.put(`/activity/status-work/update/${id}`, data);
    return response.data;
  },
  deleteStatusWork: async (id: string) => {
    const response = await api.delete(`/activity/status-work/${id}`);
    return response.data;
  },

  // Work Methods
  getAllWorks: async () => {
    const response = await api.get('/activity/work/all');
    return response.data;
  },
  getWorkById: async (id: string) => {
    const response = await api.get(`/activity/work/id/${id}`);
    return response.data;
  },
  createWork: async (data: ICreateWork) => {
    const response = await api.post('/activity/work/create', data);
    return response.data;
  },
  updateWork: async (id: string, data: IUpdateWork) => {
    const response = await api.put(`/activity/works/${id}`, data);
    return response.data;
  },
  deleteWork: async (id: string) => {
    const response = await api.delete(`/activity/works/${id}`);
    return response.data;
  },

  // TypeActivity Methods
  getAllTypeActivities: async () => {
    const response = await api.get('/activity/type/all');
    return response.data;
  },
  getTypeActivityById: async (id: string) => {
    const response = await api.get(`/activity/type/${id}`);
    return response.data;
  },
  createTypeActivity: async (data: ICreateTypeActivity) => {
    const response = await api.post('/activity/type/create', data);
    return response.data;
  },
  updateTypeActivity: async (id: string, data: IUpdateTypeActivity) => {
    const response = await api.put(`/activity/type/update/${id}`, data);
    return response.data;
  },
  deleteTypeActivity: async (id: string) => {
    const response = await api.delete(`/activity/type/${id}`);
    return response.data;
  },

  // StatusActivity Methods
  getAllStatusActivities: async () => {
    const response = await api.get('/activity/status/all');
    return response.data;
  },
  getStatusActivityById: async (id: string) => {
    const response = await api.get(`/activity/status/id/${id}`);
    return response.data;
  },
  createStatusActivity: async (data: ICreateStatusActivity) => {
    const response = await api.post('/activity/status/create', data);
    return response.data;
  },
  updateStatusActivity: async (id: string, data: IUpdateStatusActivity) => {
    const response = await api.put(`/activity/status/update/${id}`, data);
    return response.data;
  },
  deleteStatusActivity: async (id: string) => {
    const response = await api.delete(`/activity/status/${id}`);
    return response.data;
  },
};

export default activityService;
