export class GetProductDto {
    product_id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    vat: string;
    quantity: number;
    unit_product: string;
    status: 'active' | 'delete' | 'hide';
  }