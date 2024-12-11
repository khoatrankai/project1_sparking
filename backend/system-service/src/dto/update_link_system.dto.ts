import { IsOptional, IsString } from 'class-validator';

export class UpdateLinkSystemDto {

  @IsString()
  @IsOptional()
  name_tag: string;

  @IsString()
  @IsOptional()
  link: string;
}