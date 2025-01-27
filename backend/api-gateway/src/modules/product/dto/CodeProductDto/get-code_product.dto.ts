import { GetHistoryCodeProductDto } from '../HistoryCodeProduct/get-history_code_product.dto';
import { GetProductDto } from '../ProductDto/get-product.dto';

export class GetCodeProductDto {
  code_product_id: string;
  code: string;
  status:
    | 'selled'
    | 'borrowed'
    | 'inventory'
    | 'export'
    | 'maintenance'
    | 'warranty';
  product: GetProductDto; // ID sản phẩm
  created_at: Date;
  updated_at: Date;
  history?: GetHistoryCodeProductDto[];
}
