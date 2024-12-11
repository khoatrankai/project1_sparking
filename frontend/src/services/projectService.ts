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
  },
  getTypes: async()=>{
    const response = await api.get(`/project/type`);
    return response.data;
  },
  createType: async(data:{name_type:string})=>{
    const res = await api.post('/project/type', data);
    if (!res) {
        throw new Error("Failed to create type project: No response");
    }
    return res.data ;
  },
  updateType: async(type_id:string,data:string)=>{
    const res = await api.put(`/project/type/${type_id}`, {name:data});
    if (!res) {
        throw new Error("Failed to update unit project: No response");
    }
    return res.data ;
  }


};

export default projectService;