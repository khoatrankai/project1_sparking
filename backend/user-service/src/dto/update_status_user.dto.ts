import { IsEnum} from 'class-validator';

export class UpdateStatusUserDto {

  @IsEnum(['active', 'delete', 'hide'])
  status: string;
}