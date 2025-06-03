import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AccountUsers } from './account_users.entity';
import { Activity } from './activities.entity';
import { ParkingApartment } from './parking_apartment.entity';

@Entity('reviews')
export class Review {
  @PrimaryColumn()
  id: string;

  @Column('text')
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.reviews)
  @JoinColumn({ name: 'user' })
  user: AccountUsers;

  @ManyToOne(() => Activity, activity => activity.reviews)
  @JoinColumn({ name: 'activity' })
  activity: Activity;

  @ManyToOne(() => ParkingApartment, apartment => apartment.reviews)
  @JoinColumn({ name: 'apartment' })
  apartment: ParkingApartment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
