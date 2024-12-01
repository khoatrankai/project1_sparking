import { GetListPartDto } from "../ListPartDto/get_list_part.dto";

export class GetListProductDto {
    PQ_product_id: string;
    part: GetListPartDto;
    product: string;
    price: number;
    quantity: number;
    vat: number;
    profit:string
    created_at: Date;
    updated_at: Date;
  }
  