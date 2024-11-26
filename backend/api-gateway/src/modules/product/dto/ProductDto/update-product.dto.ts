import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    type?: string; // Foreign Key ID

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    vat?: string;

    @IsOptional()
    @IsString()
    profit?: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsString()
    unit_product?: string; // Foreign Key ID

    @IsOptional()
    @IsEnum(['active', 'delete', 'hide'])
    status?: 'active' | 'delete' | 'hide';

    @IsString()
    @IsOptional()
    supplier_product?: string;
}
