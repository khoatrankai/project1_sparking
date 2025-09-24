import {  IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Transform } from 'class-transformer';
import { CreateSkillDto } from "./create_skill.dto";

export class UpdateUserDto  {

    @IsString()
    @IsOptional()
    @Length(1, 50)
    password: string;
  
    @IsString()
    @Length(1, 20)
    first_name: string;
  
    @IsString()
    @Length(1, 20)
    last_name: string;
  
    @IsString()
    @IsOptional()
    @Length(1, 50)
    email: string;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    position?: string;
  
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
    @Length(1, 50)
    link_facebook?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    link_zalo?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 50)
    link_in?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 50)
    link_skype?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 50)
    sign_name?: string;
  
    @IsEnum(['active', 'delete', 'hide'])
    @IsOptional()
    status: string;


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