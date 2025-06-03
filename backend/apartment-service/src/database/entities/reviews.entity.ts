import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Activity } from './activities.entity';
import { Apartment } from './apartments.entity';

@Entity('reviews')
export class Review {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'user' })
  user: string;

  @ManyToOne(() => Activity, activity => activity.reviews)
  @JoinColumn({ name: 'activity' })
  activity: string;

  @ManyToOne(() => Apartment, apartment => apartment.reviews)
  @JoinColumn({ name: 'apartment' })
  apartment: Apartment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
