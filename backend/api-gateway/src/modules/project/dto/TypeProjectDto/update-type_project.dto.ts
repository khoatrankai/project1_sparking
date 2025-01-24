import { IsString } from 'class-validator';

export class UpdateTypeProjectDto {
  @IsString()
  name_type?: string;
}
