import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ParkingSession } from './parking_parkingsession.entity';

@Entity('parking_voucher')
export class ParkingVoucher {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ParkingSession,
    (parkingSession) => parkingSession.parkingVouchers,
  )
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;

  @Column('varchar', { length: 128, nullable: true })
  voucher_type: string;

  @Column('int', { nullable: true })
  Voucher_amount: number;

  @Column('int', { nullable: true })
  parking_fee: number;

  @Column('int', { nullable: true })
  actual_fee: number;
}
