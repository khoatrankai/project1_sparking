

interface Customer {
  customer_id: string;
  full_name: string;
  email: string;
}

interface InfoContact {
  info_contact_id: string;
  status: boolean;
  customer: Customer;
}

interface GroupCustomer {
  group_id: string;
  name_group: string;
  count: number;
}

interface CustomerInfo {
  info_id: string;
  name_company: string;
  tax_code: string;
  province: string;
  phone_number: string;
  website: string;
  type_money: string;
  status_active: string;
  date_establish: string;
  address_payment: string;
  address_delivery: string;
  province_payment: string;
  province_delivery: string;
  staff_support: string;
  created_at: string;
  updated_at: string;
  group_customer: GroupCustomer;
  infoContacts: InfoContact[];
}

  interface GroupInfo {
    group_id: string,
            name_group: string,
            count: number
  }

  interface CreateInfoCustomer {
    name_company: string;
    group_customer: string; // UUID
    tax_code: string;
    province: string;
    phone_number: string;
    website: string;
    type_money: string;
    address_payment: string;
    address_delivery: string;
    province_payment: string;
    province_delivery: string;
    staff_support: string;
  }

interface IUpdateCustomerInfo {
    info_id?: string;
    name_company?: string;
    group_customer?: string;
    tax_code?: string;
    province?: string;
    phone_number?: string;
    website?: string;
    type_money?: 'vnd' | 'usd';
    date_establish?: Date;
    address_payment?: string;
    address_delivery?: string;
    province_payment?: string;
    province_delivery?: string;
    status_active?: 'active' | 'inactive';
    staff_support?: string;
  }
  interface ICustomerStatistics {
    totalCustomer: number;
    totalActive: number;
    totalInActive: number;
    contactActive: number;
    contactInactive: number;
    contactActiveToday: number;
  }
  export type {
    CustomerInfo,GroupInfo,CreateInfoCustomer,IUpdateCustomerInfo,ICustomerStatistics
  }