import { IsOptional, IsString } from 'class-validator';

export class CreateTypeOpportunitiesDto {
  @IsOptional()
  @IsString()
  type_opportunity_id?: string;

  @IsString()
  name: string;

  @IsString()
  name_tag: string;
}
