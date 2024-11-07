import { IsInt } from 'class-validator';

export class CreateVatDto {

  @IsInt()
  type_vat: number;
}