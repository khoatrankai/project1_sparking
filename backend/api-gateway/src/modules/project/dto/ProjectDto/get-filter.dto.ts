import { IsString, IsOptional, Length } from 'class-validator';

export class GetFilterProjectDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  customer?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  opportunity?: string;

  @IsString()
    @IsOptional()
    @Length(1, 50)
    type?: string;
}
