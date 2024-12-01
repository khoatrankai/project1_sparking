import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBrandDto {

    @IsNotEmpty() // The type_product_id is optional
    @IsString()
    name?: string;
  }