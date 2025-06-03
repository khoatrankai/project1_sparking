import { Entity,  PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AccountUsers } from './account_users.entity';

@Entity('chats')
export class ChatUser {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.chats_from)
  @JoinColumn({ name: 'user1' })
  user1: AccountUsers;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.chats_to)
  @JoinColumn({ name: 'user1' })
  user2: AccountUsers;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
