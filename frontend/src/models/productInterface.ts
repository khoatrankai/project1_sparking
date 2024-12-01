



interface ProductInfo{
  product_id: string;
  name: string;
  type: string;
  price: number;
  profit:string
  code_original:string
  description: string;
  vat: string;
  brand: string;
  original: string;
  quantity: number;
  unit_product: string;
  status: 'active' | 'delete' | 'hide';
  images?:File[]
  supplier_product?:string

}


interface IPictureUrl {
  picture_id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

interface IGetProductInfo{
  product_id: string;
  name: string;
  type: ITypeProduct; // ID hoặc chi tiết loại sản phẩm
  price: number;
  profit?:string
  code_original?:string
  description: string;
  vat?: string; // VAT của sản phẩm
  brand?: IBrand; // VAT của sản phẩm
  original?: IOriginal; // VAT của sản phẩm
  vat_borrowed?:string
  profit_borrowed?:string
  quantity: number;
  unit_product: IUnitProduct; // ID hoặc chi tiết đơn vị sản phẩm
  status: 'active' | 'delete' | 'hide';
  supplier_product: IGetSupplierProduct; // ID hoặc chi tiết nhà cung cấp
  picture_urls: IPictureUrl[]; // Danh sách URL hình ảnh
  code_product: IGetCodeProduct[]; // Danh sách mã sản phẩm

}


interface IUnitProduct {
  unit_id: string;
  name_unit: string;
}
interface ITypeProduct {
  type_product_id: string;
    name: string;
}

export interface IBrand {
  brand_id: string;
    name: string;
}

export interface IOriginal {
  original_id: string;
    name: string;
}
export interface IGetCodeProduct {
  code_product_id: string;
  code: string;
  status: 'selled' | 'borrowed' | 'inventory' | 'export';
  product: IGetProductInfo; // ID hoặc chi tiết sản phẩm
  created_at: Date;
  updated_at: Date;
  history?: IGetHistoryCodeProduct[]; // Lịch sử của mã sản phẩm
}


export interface ICreateCodeProduct {
  code_product_id?: string; // Optional
  code?: string; // Optional
  status?: 'selled' | 'borrowed' | 'inventory' | 'export'; // Optional
  product: string; // ID của sản phẩm, bắt buộc
}


export interface IUpdateCodeProduct {
  status?: 'selled' | 'borrowed' | 'inventory' | 'export'; // Optional
}

export interface IGetActivityContainer {
  activity_container_id: string;
  type: 'import' | 'export';
  user?: string;
  customer?: string;
  activity?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  list_code: IGetHistoryCodeProduct[]
}

export interface IUpdateActivityContainer {
  user?: string;
  customer?: string;
  activity?: string;
  description?: string;
}



export interface ICreateActivityContainer {
  type: 'import' | 'export';
  user?: string;
  activity?: string;
  customer?: string;
  description?: string;
  list_code?: Array<{
    price: number;
    code: string;
    status: 'selled' | 'borrowed';
    vat?:string,
    profit?:string
  }>;
  list_product?: Array<{
    quantity: number;
    product: string;
    price: number;
  }>;
}

export interface ICreateHistoryCodeProduct {
  history_id: string;
  status: 'selled' | 'borrowed' | 'inventory' | 'export';
  price?: number; // Default: 0
  code_product: string; // ID of CodeProduct
  activity_container: string; // ID of ActivityContainer
}

export interface IGetHistoryCodeProduct {
  history_id?: string;
  status?: 'selled' | 'borrowed' | 'inventory' | 'export';
  code_product?: IGetCodeProduct; // Details or ID of CodeProduct
  activity_container?: IGetActivityContainer; // Details or ID of ActivityContainer
  price?: number;
}

export interface IUpdateHistoryCodeProduct {
  status?: 'selled' | 'borrowed' | 'inventory' | 'export';
  price?: number;
  code_product?: string; // ID of CodeProduct
  activity_container?: string; // ID of ActivityContainer
}

export interface IGetActivityContainer {
  activity_container_id: string;
  type: 'import' | 'export';
  user?: string;
  customer?: string;
  activity?: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  list_code: IGetHistoryCodeProduct[];
}

interface IAboutProduct {
  quantity_product: number;
  quantity_active: number;
  quantity_hide: number;
  quantity_hire: number;
  quantity_stored: number;
  quantity_ordered: number;
}

export interface IGetSupplierProduct {
  supplier_id: string;
  name: string;
  phone_number?: string; // Có thể không tồn tại
  email?: string; // Có thể không tồn tại
  address: string;
  description: string;
  products: ProductInfo; // Danh sách sản phẩm đi kèm với thông tin cơ bản
}

export interface ICreateSupplierProduct {
  supplier_id: string; // Mã nhà cung cấp (bắt buộc)
  name: string; // Tên nhà cung cấp (bắt buộc)
  phone_number?: string; // Số điện thoại (không bắt buộc)
  email?: string; // Email (không bắt buộc)
  address: string; // Địa chỉ (bắt buộc)
  description: string; // Mô tả (bắt buộc)
}

export interface IUpdateSupplierProduct {
  name?: string; // Tên nhà cung cấp
  phone_number?: string; // Số điện thoại
  email?: string; // Email
  address?: string; // Địa chỉ
  description?: string; // Mô tả
}

export type {
 ProductInfo,IUnitProduct,ITypeProduct,IGetProductInfo,IPictureUrl,IAboutProduct
}