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
import { ListUser } from './list_user.entity';

@Entity('reviewusers')
export class ReviewUsers {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  review_id: string;

  @Column({ type: 'int', default:0 })
  progress: number;  

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => ListUser, (listUser) => listUser.review_user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_work' })
  user_work: ListUser;

  @Column({ type: 'varchar', length: 50 })
  user_create: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;



}
