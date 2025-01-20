import { IsInt, IsOptional } from 'class-validator';

export class CreateTargetRevenueDto {
  @IsInt()
  revenue: number;

  @IsInt()
  @IsOptional()
  year: number;
}
