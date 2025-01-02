import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ParkingTicketPayment } from "./parking_ticketpayment.entity";
import { ParkingVehicleRegistration } from "./parking_vehicleregistration.entity";
import { ParkingVehicleRegistrationAuditLogEntry } from "./parking_vehicleregistrationauditlogentry.entity";
import { ParkingDepositPayment } from "./parking_depositpayment.entity";

@Entity('parking_userprofile')
@Unique(['user_id'])
export class ParkingUserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column('varchar', { length: 500 })
  fullname: string;

  @Column('varchar', { length: 10 })
  staff_id: string;

  @Column('date', { nullable: true })
  birthday: Date;

  @Column('int', { nullable: true })
  card_id: number;

  @OneToMany(() => ParkingTicketPayment, (payment) => payment.staff)
  ticketPayments: ParkingTicketPayment[];

  @OneToMany(() => ParkingVehicleRegistration, (post) => post.staff)
  parkingVehicleRegistrations: ParkingVehicleRegistration[];

  @OneToMany(() => ParkingVehicleRegistrationAuditLogEntry, (post) => post.staff)
  parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];

  @OneToMany(() => ParkingDepositPayment, (post) => post.staff)
  depositPayments: ParkingDepositPayment[];
}