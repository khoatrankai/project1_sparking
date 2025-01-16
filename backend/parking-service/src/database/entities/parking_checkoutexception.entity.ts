import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ParkingSession } from './parking_parkingsession.entity';

@Entity('parking_checkoutexception')
export class ParkingCheckoutException {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'parking_session_id' })
  @Index()
  parking_session_id: number;

  @Column({ type: 'varchar', length: 2000, name: 'notes' })
  notes: string;

  @Column({
    type: 'timestamp',
    name: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  timestamp: Date;

  // Foreign key to ParkingSession
  @ManyToOne(
    () => ParkingSession,
    (parkingSession) => parkingSession.checkoutExceptions,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;
}
