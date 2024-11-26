import { IsString, IsOptional, IsEnum, IsDate, IsArray } from 'class-validator';
import { GetHistoryCodeProductDto } from '../HistoryCodeProduct/get-history_code_product.dto';

export class GetActivityContainerDto {
    @IsString()
    activity_container_id: string;
  
    @IsEnum(['import', 'export'])
    type: 'import' | 'export';
  
    @IsString()
    @IsOptional()
    user: string;
  
    @IsString()
    @IsOptional()
    customer: string;
  
    @IsString()
    @IsOptional()
    activity: string;
  
    @IsString()
    @IsOptional()
    description: string;
  
    @IsDate()
    created_at: Date;
  
    @IsDate()
    updated_at: Date;
  
    @IsArray()
    list_code: GetHistoryCodeProductDto[];
  }