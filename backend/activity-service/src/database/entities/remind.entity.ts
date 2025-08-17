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

@Entity('reminds')
export class Reminds {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  remind_id: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Works, (work) => work.reminds, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'work' })
  work: Works;

  @Column({ type: 'varchar', length: 50 })
  user_create: string;

  @Column({ type: 'varchar', length: 50 })
  user_remind: string;

  @Column({type:'boolean',default: false})
  seen:boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}
