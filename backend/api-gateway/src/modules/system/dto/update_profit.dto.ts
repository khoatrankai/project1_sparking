import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProfitDto {
  @IsString()
  @IsOptional()
  profit_id: string;

  @IsInt()
  @IsOptional()
  type_profit: number;
}
