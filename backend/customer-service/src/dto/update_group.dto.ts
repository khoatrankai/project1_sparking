import { IsString, Length, IsInt, IsOptional } from 'class-validator';

export class UpdateGroupCustomerDto {

  @IsString()
  @Length(1, 50)
  group_id: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() 
  name_group?: string;

  @IsInt()
  @IsOptional() // Có thể cập nhật hoặc không
  count?: number;
}