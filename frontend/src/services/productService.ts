import { PostResponse } from '@/models/responseInterface';
import api, { api_formdata } from './api';
import { ICreateActivityContainer, ICreateSupplierProduct, IUpdateActivityContainer, IUpdateSupplierProduct } from '@/models/productInterface';
import { toast } from 'react-toastify';

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
  createType: async(data:{name:string})=>{
    const res = await api.post('/product/type', data);
    if (!res) {
        throw new Error("Failed to create type product: No response");
    }
    return res.data ;
  },
  getBrands: async()=>{
    const response = await api.get(`/product/brand`);
    return response.data;
  },
  createBrand: async(data:{name:string})=>{
    const res = await api.post('/product/brand', data);
    if (!res) {
        throw new Error("Failed to create brand product: No response");
    }
    return res.data ;
  },
  updateBrand: async(brand_id:string,data:string)=>{
    const res = await api.put(`/product/brand/${brand_id}`, {name:data});
    if (!res) {
        throw new Error("Failed to update brand product: No response");
    }
    return res.data ;
  },
  getOriginals: async()=>{
    const response = await api.get(`/product/original`);
    return response.data;
  },
  createOriginal: async(data:{name:string})=>{
    const res = await api.post('/product/original', data);
    if (!res) {
        throw new Error("Failed to create original product: No response");
    }
    return res.data ;
  },
  updateOriginal: async(original_id:string,data:string)=>{
    const res = await api.put(`/product/original/${original_id}`, {name:data});
    if (!res) {
        throw new Error("Failed to update original product: No response");
    }
    return res.data ;
  },
  createUnit: async(data:{name_unit:string})=>{
    const res = await api.post('/product/unit', data);
    if (!res) {
        throw new Error("Failed to create unit product: No response");
    }
    return res.data ;
  },

  updateUnit: async(unit_id:string,data:string)=>{
    const res = await api.put(`/product/unit/${unit_id}`, {name_unit:data});
    if (!res) {
        throw new Error("Failed to update unit product: No response");
    }
    return res.data ;
  },
  updateType: async(type_id:string,data:string)=>{
    const res = await api.put(`/product/type/${type_id}`, {name:data});
    if (!res) {
        throw new Error("Failed to update unit product: No response");
    }
    return res.data ;
  },
  createProduct: async (formdata:FormData):Promise<PostResponse | null> => {
    const res = await api_formdata.post('/product/new', formdata);
    if (!res) {
        throw new Error("Failed to create product: No response");
    }
    return res.data ;
  },
  getCodeID: async (url:string) => {
    try{
      const res = await api.get(`/product/code_url?url=${url}`);
      if (!res) {
          throw new Error("Failed to create product: No response");
      }
      if(res.data.statusCode !== 200){
        toast.error(res.data.message)
      }
      return res.data ;

    }catch{
      toast.error("Sản phẩm đã xuất kho hoặc không tồn tại");
    }
   
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
  },
  createSupplier: async (data:ICreateSupplierProduct) => {
    const res = await api.post('/product/supplier', data);
    if (!res) {
      throw new Error("Failed to create supplier product: No response");
    }
    return res.data;
  },
  
  getAllSuppliers: async () => {
    const res = await api.get('/product/supplier');
    if (!res) {
      throw new Error("Failed to fetch suppliers: No response");
    }
    return res.data;
  },
  
  getSupplierById: async (id:string) => {
    const res = await api.get(`/product/supplier/${id}`);
    if (!res) {
      throw new Error(`Failed to fetch supplier with ID ${id}: No response`);
    }
    return res.data;
  },
  
  updateSupplier: async (id:string, data:IUpdateSupplierProduct) => {
    const res = await api.put(`/product/supplier/${id}`, data);
    if (!res) {
      throw new Error(`Failed to update supplier with ID ${id}: No response`);
    }
    return res.data;
  },
  createActivityContainer: async (data: ICreateActivityContainer) => {
    const res = await api.post('/product/activity_container', data);
    if (!res) {
      throw new Error("Failed to create activity container: No response");
    }
    return res.data;
  },

  findAllActivityContainers: async (type:'import'|'export') => {
    const res = await api.get(`/product/activity_container?type=${type}`);
    if (!res) {
      throw new Error("Failed to fetch activity containers: No response");
    }
    return res.data;
  },

  findActivityContainerById: async (id: string) => {
    const res = await api.get(`/product/activity_container/${id}`);
    if (!res) {
      throw new Error(`Failed to fetch activity container with ID ${id}: No response`);
    }
    return res.data;
  },

  updateActivityContainer: async (id: string, data: IUpdateActivityContainer) => {
    const res = await api.put(`/product/activity_container/${id}`, data);
    if (!res) {
      throw new Error(`Failed to update activity container with ID ${id}: No response`);
    }
    return res.data;
  },

};

export default productService;