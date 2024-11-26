import { IsInt, IsString } from 'class-validator';

export class UpdateProfitDto {
  @IsString()
  profit_id: string;

  @IsInt()
  type_profit: number;
}