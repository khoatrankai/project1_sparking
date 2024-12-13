import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class UpdateTypeProductDto {

    @Type(()=> String)
    @IsString()
    @IsOptional() // The name is required
    name?: string;

    @IsString()
    @IsOptional() 
    name_tag: string;
  
    @IsString()
    @IsOptional() 
    description: string;
  
    @IsString()
    @IsOptional() 
    classify_type: string;
  }