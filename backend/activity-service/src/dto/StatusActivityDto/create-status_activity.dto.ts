import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStatusActivitiesDto {
  @IsOptional()
  @IsString()
  status_activity_id?: string;

  @IsString()
  name: string;

  @IsString()
  name_tag: string;

  @IsString()
  @IsNotEmpty()
  type_activity: string;
}
