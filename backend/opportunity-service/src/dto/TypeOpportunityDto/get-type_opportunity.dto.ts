import { IsOptional, IsString } from 'class-validator';

export class GetTypeOpportunitiesDto {
  @IsOptional()
  @IsString()
  type_opportunity_id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  name_tag?: string;
}
