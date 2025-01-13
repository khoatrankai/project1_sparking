import { IsOptional, IsString, Length } from "class-validator";

export class CreateCategoryRoleUserDto {
    @IsString()
    @IsOptional()
    @Length(1, 50)
    category_id: string;
  
    @IsString()
    @Length(1, 50)
    name_category: string;

  }