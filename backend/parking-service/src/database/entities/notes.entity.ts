import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AccountUsers } from './account_users.entity';

@Entity('notes')
export class Note {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => AccountUsers, user => user.notes)
  @JoinColumn({ name: 'user' })
  user: AccountUsers;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}