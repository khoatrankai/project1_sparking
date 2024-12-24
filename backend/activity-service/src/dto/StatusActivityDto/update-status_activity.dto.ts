import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStatusActivitiesDto {

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
  type_activity: string;
}
