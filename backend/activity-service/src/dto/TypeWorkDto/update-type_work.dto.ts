import { IsOptional, IsString } from 'class-validator';

export class UpdateTypeWorkDto {

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  name_tag: string;
}
