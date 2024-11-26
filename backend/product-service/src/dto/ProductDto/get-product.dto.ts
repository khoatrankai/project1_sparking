
import { GetCodeProductDto } from "../CodeProductDto/get-code_product.dto";
import { GetPictureProductDto } from "../PictureProductDto/get-picture_product.dto";
import { GetSupplierProductDto } from "../SupplierProductDto/get-supplier_product.dto";
import { GetTypeProductDto } from "../TypeProductDto/get-type_product.dto";
import { GetUnitProductDto } from "../UnitProductDto/get-unit_product.dto";

export class GetProductDto {
  product_id: string;
  name: string;
  type: GetTypeProductDto; // ID hoặc tên loại sản phẩm
  price: number;
  description: string;
  vat: string;
  quantity: number;
  unit_product: GetUnitProductDto; // ID hoặc tên đơn vị sản phẩm
  status: 'active' | 'delete' | 'hide';
  supplier_product: GetSupplierProductDto; // ID hoặc tên nhà cung cấp
  picture_urls: GetPictureProductDto[]; // URL của hình ảnh sản phẩm
  code_product: GetCodeProductDto[]; // ID các mã sản phẩm
  
}
