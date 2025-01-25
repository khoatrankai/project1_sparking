import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsString()
  readonly html: string;
}
