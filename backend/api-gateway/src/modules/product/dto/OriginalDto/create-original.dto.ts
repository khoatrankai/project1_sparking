import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOriginalDto {
    @IsOptional() // The type_product_id is optional
    @IsString()
    original_id: string;

    @IsNotEmpty() // The type_product_id is optional
    @IsString()
    name: string;
  }