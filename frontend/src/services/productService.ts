import { PostResponse } from '@/models/responseInterface';
import api, { api_formdata } from './api';

const productService = {
  getProducts: async () => {
    const response = await api.get(`/product/all`);
    return response.data;
  },getAboutProduct: async () => {
    const response = await api.get(`/product/about`);
    return response.data;
  },
  getProductID: async (product_id:string) => {
    const response = await api.get(`/product/id/${product_id}`);
    return response.data;
  },
  getProductsID: async (product_id:string) => {
    const response = await api.get(`/product/code/all/${product_id}`);
    return response.data;
  },
  deletePictureProduct: async (data:string[]) => {
    const response = await api.delete(`/product/picture`,{data});
    return response.data;
  },
  getUnits: async()=>{
    const response = await api.get(`/product/unit`);
    return response.data;
  },
  getTypes: async()=>{
    const response = await api.get(`/product/type`);
    return response.data;
  },
  createProduct: async (formdata:FormData):Promise<PostResponse | null> => {
    const res = await api_formdata.post('/product/new', formdata);
    if (!res) {
        throw new Error("Failed to create product: No response");
    }
    return res.data ;
  },
  getCodeID: async (id:string) => {
    console.log(id)
    const res = await api.get(`/product/code/${id}`);
    if (!res) {
        throw new Error("Failed to create product: No response");
    }
    return res.data ;
  },
  createCodeProduct: async (id:string) => {
    const res = await api.post('/product/code', {product:id});
    if (!res) {
        throw new Error("Failed to create product: No response");
    }
    return res.data ;
  },
  updateProductInfo: async (id:string,data:FormData,deleteImg:string[]) => {
    const res = await api_formdata.put(`/product/id/${id}`, data);
    if(deleteImg.length > 0){
      console.log(deleteImg)
      await api.delete(`/product/picture`,{data:deleteImg});

    }
    if (!res) {
        throw new Error("Failed to create product: No response");
    }
    return res.data ;
  },
  updateStatusProduct: async (id:string,status:string) => {
    const res = await api.put(`/product/status/id/${id}`, {status});
    if (!res) {
        throw new Error("Failed to update product: No response");
    }
    return res.data ;
  },
  pushImageProduct: async (formdata:FormData) =>{
    const res = await api_formdata.post('/product/picture/push', formdata);
    if (!res) {
        throw new Error("Failed to create product: No response");
    }
    return res.data ;
  }


};

export default productService;