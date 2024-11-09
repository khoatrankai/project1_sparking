// activities.dto.ts
import { IsString, IsOptional,  IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsOptional()
  activity_id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString() 
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  contract?: string;


}




