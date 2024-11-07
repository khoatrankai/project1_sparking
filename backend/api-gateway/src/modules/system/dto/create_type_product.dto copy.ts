import { IsString } from 'class-validator';

export class CreateTypeProductDto {

  @IsString()
  name_type: string;
}