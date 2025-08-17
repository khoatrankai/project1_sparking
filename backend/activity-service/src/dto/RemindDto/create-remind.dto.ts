import { IsString, IsOptional, MaxLength, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRemindDto {
  @IsString()
  @IsOptional()
  remind_id: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  work: string; // ID của Works

  @IsString()
  @IsOptional()
  user_create: string;

  @IsString()
  @IsOptional()
  user_remind: string;

  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}