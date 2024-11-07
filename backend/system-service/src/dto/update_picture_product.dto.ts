import { IsString } from 'class-validator';

export class UpdatePictureProductDto  {

  @IsString()
  picture_id: string;

  @IsString()
  url: string;

}