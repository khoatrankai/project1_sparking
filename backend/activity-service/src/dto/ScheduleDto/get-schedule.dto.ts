import { ScheduleType } from "./create-schedule.dto";

export class ScheduleDto {
  id: string;

  schedule_date: string;

  day: number;

  time: string;

  description: string;

  type: ScheduleType;

  assigned_to?: string;

  group_name?: string;

  created_at: string; // ISO string hoặc 'YYYY-MM-DD HH:mm:ss'

  updated_at: string;
}
