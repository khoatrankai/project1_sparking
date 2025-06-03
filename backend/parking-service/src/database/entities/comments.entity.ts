import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AccountUsers } from './account_users.entity';
import { Reports } from './reports.entity';

@Entity('comments')
export class Comments {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.comments)
  @JoinColumn({ name: 'user' })
  user: AccountUsers;

  @ManyToOne(() => Reports, report => report.commnets)
  @JoinColumn({ name: 'report' })
  report: Reports;


  @Column('text')
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
