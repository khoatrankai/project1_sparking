

interface Province {
  province_id: string; 
  name_province: string;
}

interface Vat {
  vat_id: string; 
  type_vat: number;
}

interface Profit {
  profit_id: string; 
  type_profit: number;
}

interface ProductInfo{
  code_product:string,
  name_product:string,
  description:string,
  quantity_product:number,
  vat:number,
  price_product:number,
  type: 'TB'|'VT',
  // index_follow:number 

}

export type {
 Province,ProductInfo,Vat,Profit
}