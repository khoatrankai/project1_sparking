import { IsOptional, IsString } from 'class-validator';

export class GetTypeActivitiesDto {
  @IsOptional()
  @IsString()
  type_activity_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  name_tag?: string;
}
