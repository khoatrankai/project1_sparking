import { IsString, Length,IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsOptional()
  @Length(1, 50)
  tag_id: string;

  @IsString()
  name: string;

  @IsString()
  @Length(1, 50)
  name_tag: string;
}
