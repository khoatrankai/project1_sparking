import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTargetRevenueDto {
  @IsString()
  @IsOptional()
  target_id: string;

  @IsInt()
  @IsOptional()
  revenue?: number;

  @IsInt()
  @IsOptional()
  year?: number;
}
