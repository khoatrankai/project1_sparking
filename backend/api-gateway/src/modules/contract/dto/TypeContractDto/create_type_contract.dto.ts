import { IsString, IsInt, Length, IsOptional } from 'class-validator';

export class CreateTypeContractDto {


  @IsString()
  @Length(1, 50)
  name_type: string;

  @IsInt()
  @IsOptional()
  count?: number = 0; 
}