import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Apartment } from './apartments.entity';

@Entity('activities')
export class Activity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.activities)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Apartment, apartment => apartment.activities)
  @JoinColumn({ name: 'apartment' })
  apartment: Apartment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}