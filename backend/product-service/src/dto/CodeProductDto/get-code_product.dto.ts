export class GetCodeProductDto {
    code_product_id: string;
    code: string;
    status: 'error' | 'stored' | 'ordered' |'hired';
    product: string;
  }