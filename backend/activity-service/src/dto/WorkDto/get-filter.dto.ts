import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class GetFilterWorkDto {
  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsBoolean()
  urgent?: boolean;
}
