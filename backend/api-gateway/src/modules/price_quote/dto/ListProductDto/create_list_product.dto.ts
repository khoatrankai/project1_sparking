import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateListProductDto {


  @IsString()
  @IsNotEmpty()
  product: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  vat: string;
}
