import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Works } from './work.entity';
import { PictureTask } from './picture_task.entity';

@Entity('tasks')
export class Tasks {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  task_id: string;

  @Column({
      type: 'enum',
      enum: ['waitting', 'fail', 'success'],
      default: 'waitting',
    })
  status: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  position: number;

  @ManyToOne(() => Works, (work) => work.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work' })
  work: Works;

  @Column({ type: 'timestamp' })
  time_start: Date;

  @Column({ type: 'timestamp' })
  time_end: Date;

  @Column({ type: 'boolean', default: false })
  urgent: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => PictureTask, (pictureWork) => pictureWork.task)
  picture_urls: PictureTask[];


}
