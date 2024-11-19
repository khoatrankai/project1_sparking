import { IsOptional, IsString } from 'class-validator';

export class CreateTypeMethodDto {
  @IsString()
  @IsOptional()
  type_method_id: string;

  @IsString()
  name: string;

  @IsString()
  name_tag: string;
}
