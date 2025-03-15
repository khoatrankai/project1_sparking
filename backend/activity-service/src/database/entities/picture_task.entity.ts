import { Tasks } from './task.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('picture_task')
export class PictureTask {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  picture_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task' })
  task: Tasks;

  @Column({ type: 'enum', enum: ['start', 'end'], default: 'start' })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
