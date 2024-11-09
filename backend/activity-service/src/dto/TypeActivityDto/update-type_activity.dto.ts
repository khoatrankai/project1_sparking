import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeActivitiesDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_tag: string;
}
