import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Works } from './work.entity';

@Entity('comments')
export class Comments {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  comment_id: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Works, (work) => work.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work' })
  work: Works;

  @Column({ type: 'varchar', length: 50 })
  user_create: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;



}
