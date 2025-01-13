import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { RoleTypeUserDto } from "./role_type.dto";

export class GetCategoryRoleUserDto {
    @IsString()
    category_id: string;
  
    @IsString()
    name_category: string;
  
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => RoleTypeUserDto)
    role_type?: RoleTypeUserDto[];
  }