import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AccountAdmin } from './account_admin.entity';
import { ParkingApartment } from './parking_apartment.entity';
import { Review } from './reviews.entity';

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

  @ManyToOne(() => AccountAdmin, accountAdmin => accountAdmin.activities)
  @JoinColumn({ name: 'admin' })
  admin: AccountAdmin;

  @ManyToOne(() => ParkingApartment, parkingApartment => parkingApartment.activities)
  @JoinColumn({ name: 'apartment' })
  apartment: ParkingApartment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Review, review => review.activity)
  reviews: Review[];
}