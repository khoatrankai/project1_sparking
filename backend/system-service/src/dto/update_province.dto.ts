import { IsString } from 'class-validator';

export class UpdateProvinceDto {
  @IsString()
  province_id: string;

  @IsString()
  name_province: string;
}