export interface  InfoUserInterface{

  user_id:string

 
  username: string;


  password: string;

  
  first_name?: string;

  
  last_name?: string;

  
  status?: boolean;

  
  email: string;

  
  phone: string;

  
  created_at:string

  
  bio: string;

  
  profile_picture: string;

  
  cover_photo: string;

  
  date_of_birth?: string; 

  
  gender: 'male' | 'female';

  }