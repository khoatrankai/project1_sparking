import { UploadFile } from "antd";


interface InfoUser {
  user_id: string; 
  first_name: string;
  last_name:string;
  email: string;
  picture_url: string;
  phone_number: string;
  status:string
}


interface CreateUser {
  first_name: string;
  last_name:string;
  password:string;
  email: string;
  picture_url?: UploadFile[];
  phone_number?: string;
  link_facebook?:string;
  link_in?: string;
  link_skype?: string;
  sign_name?: string;
}

export type {
  InfoUser,CreateUser
}