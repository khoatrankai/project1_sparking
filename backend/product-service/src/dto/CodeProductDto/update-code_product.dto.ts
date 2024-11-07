export class UpdateCodeProductDto {
    code?: string;
    status?: 'error' | 'stored' | 'ordered' |'hired';
    product?:string
  }