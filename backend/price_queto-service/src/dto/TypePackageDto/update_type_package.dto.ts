import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateTypePackageDto {

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name_package?: string;

}