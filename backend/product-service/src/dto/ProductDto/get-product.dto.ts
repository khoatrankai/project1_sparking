import { GetBrandDto } from '../BrandDto/get-brand.dto';
import { GetCodeProductDto } from '../CodeProductDto/get-code_product.dto';
import { GetListDetailDto } from '../ListDetail/get-list_detail.dto';
import { GetOriginalDto } from '../OriginalDto/get-original.dto';
import { GetPictureProductDto } from '../PictureProductDto/get-picture_product.dto';
import { GetSupplierProductDto } from '../SupplierProductDto/get-supplier_product.dto';
import { GetTypeProductDto } from '../TypeProductDto/get-type_product.dto';
import { GetUnitProductDto } from '../UnitProductDto/get-unit_product.dto';

export class GetProductDto {
  product_id: string;
  name: string;
  type: GetTypeProductDto; // ID hoặc tên loại sản phẩm
  code_original: string;
  brand: GetBrandDto; // ID hoặc tên loại sản phẩm
  original: GetOriginalDto; // ID hoặc tên loại sản phẩm
  price: number;
  warranty: number;
  description: string;
  vat: string;
  quantity: number;
  unit_product: GetUnitProductDto; // ID hoặc tên đơn vị sản phẩm
  status: 'active' | 'delete' | 'hide';
  supplier_product: GetSupplierProductDto; // ID hoặc tên nhà cung cấp
  picture_urls: GetPictureProductDto[]; // URL của hình ảnh sản phẩm
  code_product: GetCodeProductDto[]; // ID các mã sản phẩm
  details: GetListDetailDto[]; // ID các mã sản phẩm
}
