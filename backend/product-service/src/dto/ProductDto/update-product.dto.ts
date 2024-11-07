export class UpdateProductDto {
    name?: string;
    type?: string; // Foreign Key ID
    price?: number;
    description?: string;
    vat?: string;
    quantity?: number;
    unit_product?: string; // Foreign Key ID
    status?: 'active' | 'delete' | 'hide';
  }