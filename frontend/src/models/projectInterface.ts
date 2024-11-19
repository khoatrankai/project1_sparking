import { CustomerInfo } from "./customerInterface";

export interface IGetProject {
    project_id: string;
    name?: string;
    status: 'waiting' | 'start' | 'pause' | 'cancel' | 'completed';
    price?: number;
    time_job?: number;
    user_support?: string;
    customer?: CustomerInfo;
    start_date?: Date;
    end_date?: Date;
    description?: string;
    created_at: Date;
    updated_at: Date;
  }

  export interface ICreateProject {
    name: string;
    status: 'waiting' | 'start' | 'pause' | 'cancel' | 'completed';
    price?: number;
    time_job?: number;
    user_support?: string;
    customer: string;
    start_date?: Date;
    end_date?: Date;
    description?: string; 
  }

  export interface IUpdateProject {
    name?: string;
    status?: 'waiting' | 'start' | 'pause' | 'cancel' | 'completed';
    price?: number;
    time_job?: number;
    user_support?: string;
    customer?: string;
    start_date?: Date;
    end_date?: Date;
    description?: string; 
  }
  
  