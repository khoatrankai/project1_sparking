import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './users.entity';

@Entity('reports')
export class Reports {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, user => user.reports)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, comment => comment.report)
  commnets: Comment[];
}