import { IsString, IsEnum, IsOptional, IsInt } from 'class-validator';
import { GetCodeProductDto } from '../CodeProductDto/get-code_product.dto';
import { ActivityContainer } from 'src/database/entities/activity_container.entity';

export class GetHistoryCodeProductDto {
  @IsString()
  @IsOptional()
  history_id?: string;

  @IsEnum(['selled', 'borrowed', 'inventory', 'export'])
  @IsOptional()
  status?: 'selled' | 'borrowed' | 'inventory' | 'export';

  @IsString()
  @IsOptional()
  code_product?: GetCodeProductDto; // ID of CodeProduct

  @IsString()
  @IsOptional()
  vat?: string; // Default: 0

  @IsString()
  @IsOptional()
  profit?: string; // Default: 0

  @IsString()
  @IsOptional()
  activity_container?: ActivityContainer; // ID of ActivityContainer

  @IsInt()
  @IsOptional()
  price?: number;
}
