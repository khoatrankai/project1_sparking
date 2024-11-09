import { IsOptional, IsString } from 'class-validator';

export class CreateTypeSourcesDto {
  @IsString()
  @IsOptional()
  type_source_id?: string;

  @IsString()
  name: string;
}
