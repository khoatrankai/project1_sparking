import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUnitProductDto {
  @IsOptional() // The unit_id is optional
  @IsString()
  unit_id?: string;

  @IsString() // Validates that name_unit is a string
  @IsNotEmpty() // Ensures that name_unit is provided
  name_unit: string;
}
