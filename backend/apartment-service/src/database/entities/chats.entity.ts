import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('chats')
export class Chat {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, user => user.chats_from)
  @JoinColumn({ name: 'user1' })
  user1: string;

  @ManyToOne(() => User, user => user.chats_to)
  @JoinColumn({ name: 'user1' })
  user2: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
