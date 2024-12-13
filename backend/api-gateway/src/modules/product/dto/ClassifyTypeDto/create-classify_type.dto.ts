import { IsOptional, IsString } from "class-validator";

export class CreateClassifyTypeDto {



    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
  }