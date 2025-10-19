import { IsString, Length,IsOptional } from 'class-validator';

export class UpdateTagDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  name_tag: string;
}
