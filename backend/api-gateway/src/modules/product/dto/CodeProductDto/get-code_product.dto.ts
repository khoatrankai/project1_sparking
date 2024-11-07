export class GetCodeProductDto {
    code_product_id: string;
    code: string;
    status: 'error' | 'pending' | 'success';
    product: string;
  }