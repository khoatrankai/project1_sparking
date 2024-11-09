import { IsOptional, IsString } from 'class-validator';

export class UpdateStatusActivitiesDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_tag: string;

  @IsString()
  @IsOptional()
  type_activity: string;
}
