import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetStatusWorkDto {
  @IsOptional()
  @IsString()
  type_work_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsInt()
  @IsOptional()
  position:number

  @IsOptional()
  @IsString()
  name_tag?: string;

  @IsString()
  type_work: string;
}
