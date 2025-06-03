import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('managements')
export class Management {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @ManyToOne(() => User, user => user.managements)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column()
  contact: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
