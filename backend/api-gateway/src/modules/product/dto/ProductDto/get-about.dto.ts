import { IsInt } from 'class-validator';

export class ProductQuantityDto {
  @IsInt()
  quantity_product: number;

  @IsInt()
  quantity_active: number;

  @IsInt()
  quantity_hide: number;

  @IsInt()
  quantity_hire: number;

  @IsInt()
  quantity_stored: number;

  @IsInt()
  quantity_ordered: number;
}