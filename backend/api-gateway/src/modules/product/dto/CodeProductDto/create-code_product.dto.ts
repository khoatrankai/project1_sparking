import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateCodeProductDto {
  @IsOptional() // The code_product_id is optional
  @IsString()
  code_product_id?: string;

  @IsString()
  @IsOptional()  // The code is required
  code?: string;

  @IsOptional() // The status is optional
  @IsEnum(['error', 'pending', 'success']) // Validates that status is one of the specified values
  status?: 'error' | 'pending' | 'success';

  @IsString() // Validates that product is a string
  @IsNotEmpty() // Ensures the product ID is provided
  product: string; // Foreign Key ID
}
