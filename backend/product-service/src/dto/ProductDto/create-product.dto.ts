import { IsString, IsNumber, IsOptional, IsIn, IsUUID } from 'class-validator';

export class CreateProductDto {
    @IsUUID()
    product_id: string;

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsString()
    vat: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsString()
    unit_product: string;

    @IsOptional()
    @IsIn(['active', 'delete', 'hide'])
    status?: 'active' | 'delete' | 'hide';
}
