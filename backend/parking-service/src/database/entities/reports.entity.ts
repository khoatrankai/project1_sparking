import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AccountUsers } from './account_users.entity';
import { Comments } from './comments.entity';

@Entity('reports')
export class Reports {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.reports)
  @JoinColumn({ name: 'user' })
  user: AccountUsers;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comments, comment => comment.report)
  commnets: Comments[];
}