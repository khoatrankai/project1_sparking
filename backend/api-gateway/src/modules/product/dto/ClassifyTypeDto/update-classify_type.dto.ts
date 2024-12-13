import { IsOptional, IsString } from "class-validator";

export class UpdateClassifyTypeDto {
     @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
  }