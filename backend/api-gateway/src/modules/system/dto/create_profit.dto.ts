import { IsInt } from 'class-validator';

export class CreateProfitDto {

  @IsInt()
  type_profit: number;
}