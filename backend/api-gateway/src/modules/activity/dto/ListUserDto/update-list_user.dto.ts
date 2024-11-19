import { IsOptional, IsString } from "class-validator";

export class UpdateListUserDto {
  @IsString()
  @IsOptional()
  user?: string;

}