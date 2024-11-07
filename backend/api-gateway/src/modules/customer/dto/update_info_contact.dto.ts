import { IsString, Length, IsOptional, IsBoolean } from 'class-validator';

export class UpdateInfoContactDto {
  @IsString()
  @Length(1, 50)
  info_contact_id: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}