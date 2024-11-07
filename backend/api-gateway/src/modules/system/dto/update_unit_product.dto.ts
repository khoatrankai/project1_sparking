import { IsString } from 'class-validator';

export class UpdateUnitProductDto {

  @IsString()
  unit_id: string;

  @IsString()
  name_unit: string;
}