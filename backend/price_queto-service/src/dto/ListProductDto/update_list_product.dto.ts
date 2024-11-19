import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class UpdateListProductDto {



  @IsInt()
  @IsOptional()
  @Min(0)
  price?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  quantity?: number;

  @IsString()
  @IsOptional()
  vat?: string;

}
