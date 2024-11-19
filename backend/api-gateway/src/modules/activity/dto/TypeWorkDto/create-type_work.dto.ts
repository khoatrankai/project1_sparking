import { IsOptional, IsString } from 'class-validator';

export class CreateTypeWorkDto {
  @IsOptional()
  @IsString()
  type_work_id?: string;

  @IsString()
  name: string;

  @IsString()
  name_tag: string;
}
