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

@Entity('reviews')
export class Reviews {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  review_id: string;

  @Column({
      type: 'enum',
      enum: ['waitting', 'fail', 'success'],
      default: 'waitting',
    })
  status: string;

  @Column({
    type: 'enum',
    enum: ['excellent', 'good', 'satisfactory','fail','needs_improvement'],
    default: 'satisfactory',
  })
  quality: string;

  @Column({ type: 'number', default:0 })
  level: number;  

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
