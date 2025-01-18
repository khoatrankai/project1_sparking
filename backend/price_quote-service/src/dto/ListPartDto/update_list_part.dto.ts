import { IsOptional,  IsString } from 'class-validator';

export class UpdateListPartDto {



  @IsString()
  @IsOptional()
  title?: string;


  @IsString()
  @IsOptional()
  type_package: string;
}
