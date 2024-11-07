import { IsString, IsOptional, IsEnum } from 'class-validator';

export class GetFilterProposeDto {
  @IsString()
  @IsOptional()
  staff_support: string;

  @IsEnum(['0','1'])
  type_date: string = '0';
 
  @IsString()
  @IsOptional()
  status:string

  @IsString()
  @IsOptional()
  date_start:string

  @IsString()
  @IsOptional()
  type:string

  @IsString()
  @IsOptional()
  date_end:string
}