import { IsString, IsInt, IsOptional } from 'class-validator';

export class GetFilterContractDto {
  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  customer?: string;
}
