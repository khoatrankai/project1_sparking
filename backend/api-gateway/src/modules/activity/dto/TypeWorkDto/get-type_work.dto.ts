import { IsOptional, IsString } from 'class-validator';

export class GetTypeWorkDto {
  @IsOptional()
  @IsString()
  type_work_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  name_tag?: string;
}
