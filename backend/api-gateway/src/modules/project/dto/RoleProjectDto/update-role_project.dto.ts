import { IsOptional, IsString } from "class-validator";

export class UpdateRoleProjectDto {
  @IsOptional() // The type_product_id is optional
  @IsString()
  name: string;
  
  @IsOptional() // The type_product_id is optional
  @IsString()
  name_tag: string;
}
