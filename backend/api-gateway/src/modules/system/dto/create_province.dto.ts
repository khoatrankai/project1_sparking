import { IsString } from 'class-validator';

export class CreateProvinceDto {

  @IsString()
  name_province: string;
}