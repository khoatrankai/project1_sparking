import { IsOptional, IsString, IsEnum } from 'class-validator';

export class GetFilterOpportunitiesDto {
  @IsOptional()
  @IsString()
  type_opportunity?: string;

  @IsOptional()
  @IsString()
  type_source?: string;

  @IsOptional()
  @IsString()
  user_support?: string;

  @IsOptional()
  @IsEnum(['delete', 'hide', 'success', 'pending', 'cancel','send','pause'])
  status?: string;

  @IsString()
  @IsOptional()
  date_start?: string;

  @IsString()
  @IsOptional()
  date_end?: string;
}
