import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class UpdateListProductDto {

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  unit: string;

}
