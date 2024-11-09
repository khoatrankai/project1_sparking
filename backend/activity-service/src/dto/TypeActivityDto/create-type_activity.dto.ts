import { IsOptional, IsString } from 'class-validator';

export class CreateTypeActivitiesDto {
  @IsOptional()
  @IsString()
  type_activity_id?: string;

  @IsString()
  name: string;

  @IsString()
  name_tag: string;
}
