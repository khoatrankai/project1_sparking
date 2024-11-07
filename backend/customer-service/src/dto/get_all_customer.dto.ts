import { IsString } from 'class-validator';

export class GetAllCustomerDto {
  @IsString()
  page: string;

  @IsString()
  limit: string;
}