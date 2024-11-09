import { IsString,   IsOptional, IsNotEmpty } from 'class-validator';

export class GetListWorkDto {
  @IsString()
  @IsOptional()
  list_id: string;

  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  work: string;
}