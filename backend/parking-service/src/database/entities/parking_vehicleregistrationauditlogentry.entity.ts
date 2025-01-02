import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { ParkingCard } from "./parking_card.entity";
import { ParkingCustomer } from "./parking_customer.entity";
import { ParkingLevelFee } from "./parking_levelfee.entity";
import { ParkingVehicleType } from "./parking_vehicletype.entity";
import { ParkingUserProfile } from "./parking_userprofile.entity";
import { AuthUser } from "./auth_user.entity";

@Entity('parking_vehicleregistrationauditlogentry')
export class ParkingVehicleRegistrationAuditLogEntry {
  @PrimaryGeneratedColumn('increment')
  actionId: number;

  @ManyToOne(() => ParkingCard, card => card.parkingVehicleRegistrationAuditLogEntries)
  @JoinColumn({ name: 'card_id' })
  card: ParkingCard;

  @ManyToOne(() => ParkingCustomer, customer => customer.parkingVehicleRegistrationAuditLogEntries)
  @JoinColumn({ name: 'customer_id' })
  customer: ParkingCustomer;

  @ManyToOne(() => ParkingLevelFee, levelFee => levelFee.parkingVehicleRegistrationAuditLogEntries)
  @JoinColumn({ name: 'level_fee_id' })
  levelFee: ParkingLevelFee;

  @ManyToOne(() => ParkingVehicleType, vehicleType => vehicleType.parkingVehicleRegistrationAuditLogEntries)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: ParkingVehicleType;

  @ManyToOne(() => ParkingUserProfile, userProfile => userProfile.parkingVehicleRegistrationAuditLogEntries)
  @JoinColumn({ name: 'staff_id' })
  staff: ParkingUserProfile;

  @ManyToOne(() => AuthUser, user => user.parkingVehicleRegistrationAuditLogEntries)
  @JoinColumn({ name: 'action_user_id' })
  actionUser: AuthUser;

  @Column('datetime')
  action_date: Date;

  @Column('varchar', { length: 1 })
  action_type: string;

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
  expiredDate: Date;

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
}