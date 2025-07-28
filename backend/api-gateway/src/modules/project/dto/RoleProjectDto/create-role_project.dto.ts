import { IsOptional, IsString } from "class-validator";

export class CreateRoleProjectDto {

  @IsOptional() // The type_product_id is optional
  @IsString()
  role_id: string;

  @IsOptional() // The type_product_id is optional
  @IsString()
  name: string;

  @IsOptional() // The type_product_id is optional
  @IsString()
  name_tag: string;
}
