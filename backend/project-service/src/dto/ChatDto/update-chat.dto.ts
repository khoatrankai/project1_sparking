
import { CreateChatDto } from './create-chat.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateChatDto {
  @IsOptional()
  @IsString()
  name_one?: string;

  @IsOptional()
  @IsString()
  name_two?: string;

}
