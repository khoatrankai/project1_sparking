import { IsString, IsOptional, MaxLength, IsBoolean, IsNotEmpty } from 'class-validator';


export class GetRemindDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  remind_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  work?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  user_remind?: string;

  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}