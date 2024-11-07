import { IsString, IsNotEmpty } from 'class-validator';

export class SendMailDto {
  @IsNotEmpty()
  @IsString()
  readonly to: string;

  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
