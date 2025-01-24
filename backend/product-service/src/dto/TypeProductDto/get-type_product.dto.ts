import { GetClassifyTypeDto } from '../ClassifyTypeDto/get-classify_type.dto';

export class GetTypeProductDto {
  type_product_id: string;
  name: string;
  name_tag: string;
  description: string;
  classify_type: GetClassifyTypeDto;
}
