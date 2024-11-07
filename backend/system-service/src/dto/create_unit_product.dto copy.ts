import { IsString } from 'class-validator';

export class CreateUnitProductDto {

  @IsString()
  name_unit: string;
}