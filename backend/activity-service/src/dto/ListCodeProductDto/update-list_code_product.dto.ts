import { IsOptional, IsString } from "class-validator";

export class UpdateListCodeProductDto {
  @IsString()
  @IsOptional()
  code_product?: string;

}