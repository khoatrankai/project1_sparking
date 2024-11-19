import { IsOptional, IsString } from 'class-validator';

export class GetTypeSourcesDto {
  @IsOptional()
  @IsString()
  type_source_id?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
