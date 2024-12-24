import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetStatusActivitiesDto {
  @IsOptional()
  @IsString()
  type_activity_id?: string;

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
  type_activity: string;
}
