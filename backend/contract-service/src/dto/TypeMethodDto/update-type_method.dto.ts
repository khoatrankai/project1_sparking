// update-type-method.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateTypeMethodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  name_tag?: string;
}
