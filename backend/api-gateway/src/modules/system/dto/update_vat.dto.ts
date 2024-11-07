import { IsInt, IsString } from 'class-validator';

export class UpdateVatDto {
  @IsString()
  vat_id: string;

  @IsInt()
  type_vat: number;
}