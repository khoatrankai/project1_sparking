import { GetListProductDto } from "../ListProductDto/get_list_product.dto";

export class GetListPartDto {
    part_id: string;
    price_quote: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    products:GetListProductDto;
    type_package?: string;
  }
  