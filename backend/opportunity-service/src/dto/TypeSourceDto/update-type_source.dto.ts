import { IsString } from 'class-validator';

export class UpdateTypeSourcesDto {

  @IsString()
  name: string;
}
