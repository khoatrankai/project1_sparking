import { IsOptional, IsString, Length } from "class-validator";

export class UpdateCategoryRoleUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    name_category?: string;
  
  }