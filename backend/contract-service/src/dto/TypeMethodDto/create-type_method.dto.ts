// create-type-method.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTypeMethodDto {


  @IsString()
  @IsOptional()
  type_method_id:string

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_tag: string;
}
