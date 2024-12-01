import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOriginalDto {
    @IsNotEmpty() // The type_product_id is optional
    @IsString()
    name?: string;
  }