import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStatusWorkDto {
  @IsOptional()
  @IsString()
  status_work_id?: string;

  @IsString()
  name: string;

  @IsString()
  name_tag: string;

  @IsString()
  @IsNotEmpty()
  type_work: string;
}
