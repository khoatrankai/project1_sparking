import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTypeProductDto {
    @IsString()
    @IsNotEmpty() // The name is required
    name?: string;
  }