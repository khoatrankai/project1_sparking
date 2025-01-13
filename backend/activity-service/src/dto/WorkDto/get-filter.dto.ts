import { IsString, IsOptional } from 'class-validator';

export class GetFilterWorkDto {
  @IsOptional()
  @IsString()
  project?: string;
}
