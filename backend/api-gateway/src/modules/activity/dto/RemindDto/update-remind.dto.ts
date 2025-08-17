import { IsString, IsOptional, MaxLength, IsBoolean, IsNotEmpty } from 'class-validator';


export class UpdateRemindDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  work?: string;

  @IsOptional()
  @IsString()
  user_create?: string;

  @IsOptional()
  @IsString()
  user_remind?: string;

  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}