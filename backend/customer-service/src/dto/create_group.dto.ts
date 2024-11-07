import { IsString, Length, IsInt, IsOptional } from 'class-validator';

export class CreateGroupCustomerDto {
  @IsString()
  @Length(1, 50)
  name_group: string;

  @IsInt()
  @IsOptional() 
  count?: number = 0;
}