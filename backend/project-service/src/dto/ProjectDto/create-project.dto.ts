import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsDate,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateRoleUserDto } from '../RoleUserDto/create-role_user.dto';

export class CreateProjectDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  project_id: string;

  @IsString()
  @IsOptional()
  @Length(1, 100)
  name?: string;

  @IsEnum(['waiting', 'start', 'pause', 'cancel', 'completed'])
  @IsOptional()
  status: string = 'waiting';

  @IsInt()
  @IsOptional()
  price?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  picture_url?: string;

  @IsInt()
  @IsOptional()
  time_job?: number;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  user_support?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  customer?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50)
  opportunity?: string;

  @IsDate()
  @IsOptional()
  start_date?: Date;

  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsOptional()
  description?: string;


  @IsOptional()
  @Transform(({ value }) => {
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value);
          if (!Array.isArray(parsed)) throw new Error();
          return parsed;
        } catch {
          throw new Error('Invalid JSON format in "answers"');
        }
      }
      return value; // Trường hợp gửi qua JSON raw thì để nguyên
  })
  users:CreateRoleUserDto[]
}
