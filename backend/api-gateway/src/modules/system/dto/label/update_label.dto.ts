import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateLabelDto {

  @IsString()
  label_id: string;

  @IsString()
  name_label?: string;

  @IsOptional()
  @IsInt()
  count?: number;
}