import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ParkingCard } from './parking_card.entity';
import { ParkingCustomer } from './parking_customer.entity';
import { ParkingLevelFee } from './parking_levelfee.entity';
import { ParkingVehicleType } from './parking_vehicletype.entity';
import { ParkingUserProfile } from './parking_userprofile.entity';
import { ParkingDepositPaymentDetail } from './parking_depositpaymentdetail.entity';
import { ParkingTicketPaymentDetail } from './parking_ticketpaymentdetail.entity';

@Entity('parking_vehicleregistration')
export class ParkingVehicleRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingCard, (card) => card.parkingVehicleRegistrations)
  @JoinColumn({ name: 'card_id' })
  card: ParkingCard;

  @ManyToOne(
    () => ParkingCustomer,
    (customer) => customer.parkingVehicleRegistrations,
  )
  @JoinColumn({ name: 'customer_id' })
  customer: ParkingCustomer;

  @ManyToOne(
    () => ParkingLevelFee,
    (levelFee) => levelFee.parkingVehicleRegistrations,
  )
  @JoinColumn({ name: 'level_fee_id' })
  levelFee: ParkingLevelFee;

  @ManyToOne(
    () => ParkingVehicleType,
    (vehicleType) => vehicleType.parkingVehicleRegistrations,
  )
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: ParkingVehicleType;

  @ManyToOne(
    () => ParkingUserProfile,
    (userProfile) => userProfile.parkingVehicleRegistrations,
  )
  @JoinColumn({ name: 'staff_id' })
  staff: ParkingUserProfile;

  @Column('datetime')
  registration_date: Date;

  @Column('date', { nullable: true })
  first_renewal_effective_date: Date;

  @Column('date', { nullable: true })
  last_renewal_date: Date;

  @Column('date', { nullable: true })
  last_renewal_effective_date: Date;

  @Column('date', { nullable: true })
  start_date: Date;

  @Column('date', { nullable: true })
  expired_date: Date;

  @Column('date', { nullable: true })
  pause_date: Date;

  @Column('date', { nullable: true })
  cancel_date: Date;

  @Column('varchar', { length: 255 })
  vehicle_driver_name: string;

  @Column('varchar', { length: 255 })
  vehicle_driver_id: string;

  @Column('varchar', { length: 255 })
  vehicle_driver_phone: string;

  @Column('varchar', { length: 255 })
  vehicle_number: string;

  @Column('varchar', { length: 255 })
  vehicle_brand: string;

  @Column('varchar', { length: 255 })
  vehicle_paint: string;

  @Column('int')
  status: number;

  @Column('varchar', { length: 45, nullable: true })
  numberplate: string;

  @Column('timestamp', { nullable: true })
  timestamp: Date;

  @OneToMany(
    () => ParkingDepositPaymentDetail,
    (post) => post.vehicleRegistration,
  )
  depositPaymentDetail: ParkingDepositPaymentDetail[];

  @OneToMany(
    () => ParkingTicketPaymentDetail,
    (post) => post.vehicleRegistration,
  )
  paymentDetails: ParkingTicketPaymentDetail[];
}
