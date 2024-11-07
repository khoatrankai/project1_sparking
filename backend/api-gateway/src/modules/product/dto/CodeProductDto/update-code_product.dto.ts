export class UpdateCodeProductDto {
    code?: string;
    status?: 'error' | 'pending' | 'success';
    product?:string
  }