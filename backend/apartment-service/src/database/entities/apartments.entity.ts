import { OneToMany } from 'typeorm';
// apartments.entity.ts
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';
import { ApartmentVehicle } from './apartment_vehicles.entity';
import { Guest } from './guests.entity';
import { Activity } from './activities.entity';
import { ApartmentMember } from './apartment_members.entity';

@Entity('apartments')
export class Apartment {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  address: string;


  @ManyToOne(() => User, user => user.apartments)
  @JoinColumn({ name: 'user' })
  user: User;

  @Column({ nullable: true })
  owner_name: string;

  @Column({ nullable: true })
  owner_phone: string;

  @Column({ nullable: true })
  owner_email: string;

  @Column({ default: 0 })
  bike_slot: number;

  @Column({ default: 0 })
  car_slot: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => ApartmentVehicle, apartment => apartment.apartment)
  apartment_vehicle: ApartmentVehicle[];

  @OneToMany(() => Guest, guest => guest.apartment)
  guests: Guest[];

  @OneToMany(() => Activity, activity => activity.apartment)
  activities: Activity[];

  @OneToMany(() => ApartmentVehicle, activity => activity.apartment)
  vehicles: ApartmentVehicle[];

  @OneToMany(() => ApartmentMember, activity => activity.apartment)
  list_member: ApartmentMember[];
}
