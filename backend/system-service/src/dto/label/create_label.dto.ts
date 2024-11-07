import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  name_label: string;

  @IsOptional()
  @IsInt()
  count?: number;
}