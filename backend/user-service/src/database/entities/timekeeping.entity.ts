import { Entity, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AccountUsers } from './account_users.entity';

@Entity('timekeeping')
export class TimeKeeping {
  @PrimaryGeneratedColumn('uuid')
  timekeeping_id: string;

  @ManyToOne(() => AccountUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_info' })
  user_info: AccountUsers;

  @CreateDateColumn({ type: 'timestamp' })
  time_start: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  time_end: Date;

  @Column({type:'boolean',default: false})
  completed:boolean;
}
