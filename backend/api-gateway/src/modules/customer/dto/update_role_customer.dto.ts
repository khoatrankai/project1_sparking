import { IsString, IsBoolean, IsOptional, Length } from 'class-validator';

export class UpdateRoleCustomerDto {
  @IsString()
  @Length(1, 50)
  role_id: string;

  @IsBoolean()
  @IsOptional() // Có thể cập nhật hoặc không
  status?: boolean;
}