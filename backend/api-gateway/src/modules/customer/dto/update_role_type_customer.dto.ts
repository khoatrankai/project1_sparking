import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateRoleTypeCustomerDto {

  @IsString()
  @Length(1, 50)
  role_type_id: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  name_role?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional() // Có thể cập nhật hoặc không
  name_tag?: string;
}