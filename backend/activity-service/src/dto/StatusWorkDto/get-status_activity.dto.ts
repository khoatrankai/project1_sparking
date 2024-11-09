import { IsOptional, IsString } from 'class-validator';

export class GetStatusWorkDto {
  @IsOptional()
  @IsString()
  type_work_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  name_tag?: string;

  @IsString()
  type_work: string;
}
