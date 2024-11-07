import { IsString } from 'class-validator';

export class UpdateTypeProductDto {

  @IsString()
  type_id: string;

  @IsString()
  name_type: string;
}