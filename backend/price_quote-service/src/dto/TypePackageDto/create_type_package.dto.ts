import { IsString, Length } from 'class-validator';

export class CreateTypePackageDto {


  @IsString()
  @Length(1, 50)
  name_package: string;

}