import { IsEnum, IsInt, IsOptional, IsUUID, Min,IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  allocation: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  spent: number;

  @IsOptional()
  @IsEnum(['company', 'project', 'activity', 'capital', 'hr'])
  type: 'company' | 'project' | 'activity' | 'capital' | 'hr';
}