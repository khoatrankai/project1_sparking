import { IsString, IsOptional } from 'class-validator';

export class UpdateListDetailDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  product: string;
}
