import { IsString, IsInt, Length, IsOptional } from 'class-validator';

export class UpdateTypeContractDto {
  @IsString()
  @IsOptional()
  type_id: string; // Có thể không bắt buộc khi cập nhật

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name_type?: string; // Có thể không bắt buộc khi cập nhật

  @IsInt()
  @IsOptional()
  count?: number; // Có thể không bắt buộc khi cập nhật
}