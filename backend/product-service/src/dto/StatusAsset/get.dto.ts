import { ChangeType } from "./create.dto";


export class GetAssetStatusDto {
  id: string;
  change_type: ChangeType;
  user: string;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
  old_value?: string;
  new_value?: string;
  notes?: string;
  product: string; // asset ID
}
