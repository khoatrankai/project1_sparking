import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingTicketPayment } from './parking_ticketpayment.entity';
import { ParkingVehicleRegistration } from './parking_vehicleregistration.entity';
import { ParkingVehicleRegistrationAuditLogEntry } from './parking_vehicleregistrationauditlogentry.entity';
import { ParkingDepositPayment } from './parking_depositpayment.entity';
import { AuthUser } from './auth_user.entity';
import { ParkingCard } from './parking_card.entity';

@Entity('parking_userprofile')
@Unique(['user'])
@Unique(['card'])
export class ParkingUserProfile {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => AuthUser)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @Column({ type: 'varchar', length: 500, name: 'fullname' })
  fullname: string;

  @Column({ type: 'varchar', length: 10, name: 'staff_id' })
  staffId: string;

  @Column({ type: 'date', name: 'birthday', nullable: true })
  birthday: Date | null;

  @OneToOne(() => ParkingCard)
  @JoinColumn({ name: 'card_id' })
  card: ParkingCard | null;

  @OneToMany(() => ParkingTicketPayment, (payment) => payment.staff)
  ticketPayments: ParkingTicketPayment[];

  @OneToMany(() => ParkingVehicleRegistration, (post) => post.staff)
  parkingVehicleRegistrations: ParkingVehicleRegistration[];

  @OneToMany(
    () => ParkingVehicleRegistrationAuditLogEntry,
    (post) => post.staff,
  )
  parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];

  @OneToMany(() => ParkingDepositPayment, (post) => post.staff)
  depositPayments: ParkingDepositPayment[];
}
