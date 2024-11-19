import { ICreateProject, IUpdateProject } from '@/models/projectInterface';
import api from './api';

const projectService = {
  createProject: async (data:ICreateProject) => {
    const response = await api.post(`/project`,data);
    return response.data;
  },
  getProjects: async () => {
    const response = await api.get(`/project/all`);
    return response.data;
  },
  getProject: async(id:string)=>{
    const response = await api.get(`/project/id/${id}`);
    return response.data;
  },
  updateProject: async(id:string,data:IUpdateProject)=>{
    const response = await api.put(`/project/update/${id}`,data);
    return response.data;
  }


};

export default projectService;