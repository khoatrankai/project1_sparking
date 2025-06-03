import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ParkingCustomer } from './parking_customer.entity';
import { ParkingCustomerAuditLogEntry } from './parking_customerauditlogentry.entity';
import { AccountApartment } from './account_apartment.entity';
import { Activity } from './activities.entity';
import { Review } from './reviews.entity';
import { Guest } from './guests.entity';
import { ApartmentMember } from './apartment_members.entity';

@Entity('parking_apartment')
export class ParkingApartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

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

  @CreateDateColumn()
  timestamp: Date;

  @OneToMany(() => ParkingCustomer, (post) => post.apartment)
  customers: ParkingCustomer[];

  @OneToMany(() => ParkingCustomerAuditLogEntry, (post) => post.apartment)
  customerAuditLogEntry: ParkingCustomerAuditLogEntry[];

  @OneToMany(() => AccountApartment, acountApartment => acountApartment.apartment)
  account_apartment: AccountApartment[];

  @OneToMany(() => Activity, activity => activity.apartment)
  activities: Activity[];

  @OneToMany(() => Review, review => review.apartment)
  reviews: Review[];

  @OneToMany(() => Guest, guest => guest.apartment)
  guests: Guest[];

  @OneToMany(() => ApartmentMember, apartmentMember => apartmentMember.apartment)
  list_member: ApartmentMember[];
}
