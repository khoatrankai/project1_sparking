import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateVatDto {
  @IsString()
  @IsOptional()
  vat_id: string;

  @IsInt()
  @IsOptional()
  type_vat: number;
}
