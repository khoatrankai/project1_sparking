import { IGetProject } from "./projectInterface";
import { InfoUser } from "./userInterface";


export interface ICreatePriceQuote {
  project: string;
  date_start: Date;
  date_expired: Date;
  status?: 'draff' | 'send' | 'open' | 'edit' | 'refuse' | 'accept'; // Có thể để mặc định
  type_money?: 'vnd' | 'usd'; // Mặc định là 'vnd'
  reference_code: string;
  user_support?: string | null;
  type_vat?: 'none' | 'before' | 'after'; // Mặc định là 'none'
  type_discount?: 'percent' | 'money'; // Mặc định là 'percent'
  discount?: number; // Mặc định là 0
  description?: string | null;
  products: ICreatePriceQuoteProduct[];       
 
}

export interface FilterPriceQuote{
  project?:string;
  type_date?:string;
  status?:string;
  date_start?:string;
  date_expired?:string;
  user_support?:string;
}

export interface IUpdatePriceQuote {
  project?: string;
  date_start?: Date;
  date_expired?: Date;
  status?: 'draff' | 'send' | 'open' | 'edit' | 'refuse' | 'accept';
  type_money?: 'vnd' | 'usd';
  reference_code?: string;
  user_support?: string | null;
  type_vat?: 'none' | 'before' | 'after';
  type_discount?: 'percent' | 'money';
  discount?: number;
  description?: string | null;   
 
}

export interface IGetPriceQuote {
  price_quote_id: string;
  project: IGetProject;
  date_start: Date;
  date_expired: Date;
  status: 'draff' | 'send' | 'open' | 'edit' | 'refuse' | 'accept';
  type_money: 'vnd' | 'usd';
  reference_code: string;
  user_support: InfoUser;
  type_vat: 'none' | 'before' | 'after';
  type_discount: 'percent' | 'money';
  discount: number;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  products: IGetPriceQuoteProduct[];       
 
}

export interface ICreatePriceQuoteProduct {
  product: string;
  price: number;
  quantity: number;
  vat?: string | null; 
  }

  export interface IUpdatePriceQuoteProduct {
    price_quote?: string; // Có thể cập nhật `price_quote_id`
    product?: string;
    price?: number;
    quantity?: number;
    vat?: string | null;
  }

  export interface IGetPriceQuoteProduct {
    PQ_product_id: string;
    price_quote: string; // Quan hệ với `PriceQuote` chỉ giữ `price_quote_id` hoặc đối tượng đầy đủ nếu cần
    product: string;
    price: number;
    quantity: number;
    vat: string | null;
    created_at: Date;
    updated_at: Date;
  }