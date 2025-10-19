import { IsString,IsOptional,IsInt } from 'class-validator';
export type ScheduleType = 'individual' | 'group' | 'all';

export class UpdateScheduleDto {

  @IsString()
  @IsOptional()
  schedule_date: string; // 'YYYY-MM-DD'

  @IsInt()
  @IsOptional()
  day: number; // 0 - 6

  @IsString()
  @IsOptional()
  time: string; // 'HH:mm'

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  type: ScheduleType;

  @IsString()
  @IsOptional()
  assigned_to?: string; // only if type === 'individual'

  @IsString()
  @IsOptional()
  group_name?: string; // only if type === 'group'
}
