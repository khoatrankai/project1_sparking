import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeOpportunitiesDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_tag: string;
}
