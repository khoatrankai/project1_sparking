import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreatePictureProductDto {
  @IsOptional() // The picture_id is optional
  @IsString()
  picture_id?: string;

  @IsArray()
  url: string[];

  @IsString() // Validates that product is a string
  @IsNotEmpty() // Ensures the product ID is provided
  product: string; // Foreign Key ID
}
