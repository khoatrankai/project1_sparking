import { IsString, IsOptional, Length } from 'class-validator';

export class GetFilterProjectDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  customer?: string;
}
