import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStatusWorkDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_tag: string;

  @IsInt()
  @IsOptional()
  position:number

  @IsString()
  @IsOptional()
  type_work: string;
}
