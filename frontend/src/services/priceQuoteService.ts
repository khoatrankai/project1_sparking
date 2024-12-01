
import { FilterPriceQuote, ICreatePriceQuote, IUpdatePriceQuote } from '@/models/priceQuoteInterface';
import api from './api';

const priceQuoteService = {
  createPriceQuote: async (data:ICreatePriceQuote) => {
    const response = await api.post(`/price_quote`,data);
    return response.data;
  },
  updatePriceQuote: async (id:string,data:ICreatePriceQuote) => {
    const response = await api.put(`/price_quote/${id}`,data);
    return response.data;
  },
  getPriceQuotes: async (filters?: FilterPriceQuote) => {
    const queryParams = new URLSearchParams();
  
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
    }
  
    const response = await api.get(`/price_quote/all?${queryParams.toString()}`);
    return response.data;
  },
  getPriceQuoteID: async (id:string) => {
   
    const response = await api.get(`/price_quote/id/${id}`);
    return response.data;
  },

  getExportPriceQuote: async(id:string)=>{
    const response = await api.get(`/price_quote/export/${id}`);
    return response.data;
  }


};

export default priceQuoteService;