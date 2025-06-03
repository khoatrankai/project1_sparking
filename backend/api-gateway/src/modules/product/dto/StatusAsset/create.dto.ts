import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export enum ChangeType {
   NEW = 'new',
  IN_USE = 'in_use',
  UNDER_REPAIR = 'under_repair',
  RETIRED = 'retired',
  DAMAGED = 'damaged',
  LOST = 'lost',
  DISPOSED = 'disposed',
}

export class CreateAssetStatusDto {
  @IsEnum(ChangeType)
  change_type: ChangeType;

  @IsString()
  @IsOptional()
  user: string;

  @IsDateString()
  end_date: Date;

  @IsOptional()
  @IsString()
  old_value?: string;

  @IsOptional()
  @IsString()
  new_value?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  asset: string; // asset ID
}
