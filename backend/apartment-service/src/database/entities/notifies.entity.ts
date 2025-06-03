import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('notifies')
export class Notify {
  @PrimaryColumn()
  id: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, user => user.notifies)
  @JoinColumn({ name: 'user' })
  user: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
