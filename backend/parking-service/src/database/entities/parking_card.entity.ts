import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ParkingVehicleRegistration } from './parking_vehicleregistration.entity';
import { ParkingVehicleRegistrationAuditLogEntry } from './parking_vehicleregistrationauditlogentry.entity';
import { ParkingCardStatus } from './parking_cardstatus.entity';
import { ParkingUserCard } from './parking_usercard.entity';
import { ParkingSession } from './parking_parkingsession.entity';

@Entity('parking_card')
export class ParkingCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, unique: true, name: 'card_id' })
  card_id: string;

  @Column({ type: 'varchar', length: 128, unique: true })
  card_label: string;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'int' })
  vehicle_type: number;

  @Column({ type: 'int' })
  card_type: number;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  note: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @OneToMany(() => ParkingVehicleRegistration, (post) => post.card)
  parkingVehicleRegistrations: ParkingVehicleRegistration[];

  @OneToMany(() => ParkingVehicleRegistrationAuditLogEntry, (post) => post.card)
  parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];

  @OneToMany(() => ParkingCardStatus, (post) => post.parkingCard)
  cardStatuses: ParkingCardStatus[];

  @OneToMany(() => ParkingUserCard, (post) => post.card)
  userCards: ParkingUserCard[];

  @OneToMany(() => ParkingSession, (post) => post.parkingCard)
  parkingSessions: ParkingSession[];
}
