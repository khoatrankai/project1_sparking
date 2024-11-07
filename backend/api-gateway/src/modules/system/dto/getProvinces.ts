import { IsString } from 'class-validator';

export class GetProvinceDto {
  @IsString()
  province_id: string;

  @IsString()
  name_province: string;
}