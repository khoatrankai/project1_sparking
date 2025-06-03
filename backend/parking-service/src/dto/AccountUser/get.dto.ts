import { Gender, Status } from "./create.dto";


export class GetAccountUserDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position?: string;
  picture_url?: string;
  gender: Gender;
  phone_number: string;
  date_of_birth: string;
  date_active: string;
  status: Status;
  created_at: string;
  updated_at: string;
}
