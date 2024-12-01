export interface IGetPriceQuote {
    price_quote_id: string;
    project: string;
    date_start: string;
    date_expired: string;
    status: string;
    type_money: string;
    reference_code: string;
    user_support: string;
    type_vat: string;
    type_discount: string;
    discount: number;
    description: string | null;
    created_at: string;
    updated_at: string;
    parts: Part[];
  }
  
  interface Part {
    part_id: string;
    title: string;
    created_at: string;
    updated_at: string;
    products: Product[];
  }
  
  interface Product {
    product_id: string;
    code_original: string | null;
    name: string;
    price: number;
    description: string;
    vat: string;
    profit: Profit;
    quantity: number;
    status: string;
    type: ProductType;
    unit_product: UnitProduct;
    code_product: CodeProduct[];
    brand: Brand;
    original: Original;
    PQ_product_id: string;
    product: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Profit {
    profit_id: string;
    type_profit: number;
  }
  
  interface ProductType {
    type_product_id: string;
    name: string;
  }
  
  interface UnitProduct {
    unit_id: string;
    name_unit: string;
  }
  
  interface CodeProduct {
    code_product_id: string;
    code: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Brand {
    brand_id: string;
    name: string;
  }
  
  interface Original {
    original_id: string;
    name: string;
  }