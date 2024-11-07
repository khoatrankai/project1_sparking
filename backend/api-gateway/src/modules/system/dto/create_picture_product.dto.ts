import { IsString } from 'class-validator';

export class CreatePictureProductDto {

  @IsString()
  url: string;

  @IsString()
  product_id: string;
}