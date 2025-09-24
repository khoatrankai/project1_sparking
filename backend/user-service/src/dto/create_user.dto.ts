import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  IsEmail,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateSkillDto } from './create_skill.dto';
export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  first_name: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  last_name: string;

  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  picture_url?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  phone_number?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  position?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_facebook?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_zalo?: string;


  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_in?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 50)
  link_skype?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  sign_name?: string;

  @IsOptional()
  @IsEnum(['active', 'delete', 'hide'])
  status: string = 'active';

  @IsOptional()
  @IsString()
  group_user?: string;

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
  skills?: CreateSkillDto[ ];
}
