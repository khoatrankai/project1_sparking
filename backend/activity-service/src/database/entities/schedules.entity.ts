import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ScheduleType = 'individual' | 'group' | 'all';

@Entity('schedules')
export class Schedule {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'date', name: 'schedule_date' })
  schedule_date: string; // YYYY-MM-DD

  @Column({ type: 'tinyint' })
  day: number; // 0 = Sunday, 6 = Saturday

  @Column({ type: 'time' })
  time: string; // HH:mm:ss

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ['individual', 'group', 'all'] })
  type: ScheduleType;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'assigned_to' })
  assigned_to?: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'group_name' })
  group_name?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
