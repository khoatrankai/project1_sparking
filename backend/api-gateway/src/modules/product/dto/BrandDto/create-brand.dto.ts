import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
    @IsOptional() // The type_product_id is optional
    @IsString()
    brand_id: string;

    @IsNotEmpty() // The type_product_id is optional
    @IsString()
    name: string;
  }