import { GetProductDto } from "../ProductDto/get-product.dto";

export class GetSupplierProductDto {
    supplier_id: string;
    name: string;
    phone_number?: string;
    email?: string;
    address: string;
    description: string;
    products?:GetProductDto[]
  }
  