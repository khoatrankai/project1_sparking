import { IsString, IsOptional } from 'class-validator';

export class UpdateTypeMethodDto {
  @IsString()
  @IsOptional()
  type_method_id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  name_tag?: string;
}
