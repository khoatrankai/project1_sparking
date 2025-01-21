import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class GetFilterContractDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  customer?: string;
}
