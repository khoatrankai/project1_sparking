import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Report } from './reports.entity';

@Entity('comments')
export class Comments {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Report, report => report.comments)
  @JoinColumn({ name: 'report' })
  report: Report;


  @Column('text')
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
