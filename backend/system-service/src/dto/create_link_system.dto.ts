import { IsString } from 'class-validator';

export class CreateLinkSystemDto {

  @IsString()
  name_tag: string;

  @IsString()
  link: string;
}