
import { ICreateOpportunitiesDto, ICreateOpportunitySourcesDto, ICreateTypeOpportunitiesDto, IUpdateOpportunitiesDto, IUpdateTypeOpportunitiesDto } from '@/models/opportunityInterface';
import api from './api';

const opportunityService = {

  getTypeOpportunity: async () => {
    const response = await api.get(`/opportunity/type` );
    return response.data;
  },
  getOpportunities: async () => {
    const response = await api.get(`/opportunity/all` );
    return response.data;
  },
  getOpportunity: async (id:string) => {
    const response = await api.get(`/opportunity/id/${id}` );
    return response.data;
  },
  getSourcesOpportunity: async () => {
    const response = await api.get(`/opportunity/source` );
    return response.data;
  },
  createOpportunity: async (data:ICreateOpportunitiesDto) => {
    const response = await api.post(`/opportunity`,data );
    return response.data;
  },
  createTypeOpportunity: async (data:ICreateTypeOpportunitiesDto) => {
    const response = await api.post(`/opportunity/type`,data );
    return response.data;
  },
  createSourceOpportunity: async (data:ICreateOpportunitySourcesDto) => {
    const response = await api.post(`/opportunity/source`,data );
    return response.data;
  },
  updateOpportunity: async (id:string,data:IUpdateOpportunitiesDto) => {
    const response = await api.put(`/opportunity/update/${id}`,data );
    return response.data;
  },
  updateTypeOpportunity: async (id:string,data:IUpdateTypeOpportunitiesDto) => {
    const response = await api.put(`/opportunity/type/${id}`,data );
    return response.data;
  },
  updateSourceOpportunity: async (id:string,data:string) => {
    const response = await api.put(`/opportunity/source/${id}`,{name:data} );
    return response.data;
  },


};

export default opportunityService;