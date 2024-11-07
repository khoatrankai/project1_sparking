


interface ProductInfo{
  product_id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  vat: string;
  quantity: number;
  unit_product: string;
  status: 'active' | 'delete' | 'hide';
  images?:File[]

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
  price: number;
  description: string;
  vat: string;
  quantity: number;
  status: string;
  picture_urls: IPictureUrl[];
  type: ITypeProduct;
  unit_product: IUnitProduct;

}


interface IUnitProduct {
  unit_id: string;
  name_unit: string;
}
interface ITypeProduct {
  type_product_id: string;
    name: string;
}
interface ICodeProduct {
  code_product_id: string; // ID sản phẩm (PrimaryColumn)
  code: string;            // Mã sản phẩm
  status: "error" | "pending" | "success"; // Trạng thái của sản phẩm
  product?:IGetProductInfo
}

interface IAboutProduct {
  quantity_product: number;
  quantity_active: number;
  quantity_hide: number;
  quantity_hire: number;
  quantity_stored: number;
  quantity_ordered: number;
}


export type {
 ProductInfo,IUnitProduct,ITypeProduct,IGetProductInfo,IPictureUrl,ICodeProduct,IAboutProduct
}