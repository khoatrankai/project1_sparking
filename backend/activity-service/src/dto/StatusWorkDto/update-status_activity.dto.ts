import { IsOptional, IsString } from 'class-validator';

export class UpdateStatusWorkDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_tag: string;

  @IsString()
  @IsOptional()
  type_work: string;
}
