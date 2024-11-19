import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUnitProductDto {
    @IsString() // Validates that name_unit is a string
    @IsNotEmpty()
    name_unit?: string;
  }