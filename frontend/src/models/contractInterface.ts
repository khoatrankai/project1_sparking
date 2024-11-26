import { CustomerInfo } from "./customerInterface";
import { IGetProject } from "./projectInterface";

export interface ICreateContract {
  name_contract: string;
  project: string;
  customer: string;
  price: number;
  type: 'default' | 'time';
  times?: number;
  type_contract: string; // Should reference `type_id` from TypeContract
  date_start: Date;
  date_expired: Date;
  status?: 'delete' | 'active' | 'hide';
  description?: string;
}

export interface IGetContract {
  contract_id: string;
  name_contract?: string;
  project?: IGetProject;
  customer?: CustomerInfo;
  price?: number;
  type?: 'default' | 'time';
  times?: number;
  type_contract?: IGetTypeContract; // Should reference `type_id` from TypeContract
  date_start?: Date;
  date_expired?: Date;
  status?: 'delete' | 'active' | 'hide';
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUpdateContract {
  name_contract?: string;
  project?: string;
  customer?: string;
  price?: number;
  type?: 'default' | 'time';
  times?: number;
  type_contract?: string; // Should reference `type_id` from TypeContract
  date_start?: Date;
  date_expired?: Date;
  status?: 'delete' | 'active' | 'hide';
  description?: string;
}


export interface ICreatePayment {
  payment_id: string;
  contract: string; // Should reference `contract_id` from Contract
  status: 'pending' | 'fail' | 'success';
  price: number;
  date_expired: Date;
  type_method: string; // Should reference `type_method_id` from TypeMethod
}

export interface IGetPayment {
  payment_id?: string;
  contract?: string; // Should reference `contract_id` from Contract
  status?: 'pending' | 'fail' | 'success';
  price?: number;
  date_expired?: Date;
  created_at?: Date;
  updated_at?: Date;
  type_method?: string; // Should reference `type_method_id` from TypeMethod
}

export interface IUpdatePayment {
  contract?: string; // Should reference `contract_id` from Contract
  status?: 'pending' | 'fail' | 'success';
  price?: number;
  date_expired?: Date;
  type_method?: string; // Should reference `type_method_id` from TypeMethod
}

export interface ICreateTypeContract {
  type_id: string;
  name_type: string;
  count?: number;
}

export interface IGetTypeContract {
  type_id?: string;
  name_type?: string;
  count?: number;
}

export interface IUpdateTypeContract {
  name_type?: string;
  count?: number;
}

export interface ICreateTypeMethod {
  type_method_id: string;
  name: string;
  name_tag: string;
}

export interface IGetTypeMethod {
  type_method_id?: string;
  name?: string;
  name_tag?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUpdateTypeMethod {
  name?: string;
  name_tag?: string;
}
