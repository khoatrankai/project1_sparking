import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingTerminal } from './parking_terminal.entity';
import { ParkingSession } from './parking_parkingsession.entity';

@Entity('parking_checkinimage')
export class ParkingCheckinImage {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'int', name: 'parking_session_id' })
  @Index()
  parking_session_id: number;

  @Column({ type: 'int', name: 'terminal_id' })
  @Index()
  terminal_id: number;

  // Foreign key to ParkingSession
  @ManyToOne(
    () => ParkingSession,
    (parkingSession) => parkingSession.checkinImages,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;

  // Foreign key to ParkingTerminal
  @ManyToOne(
    () => ParkingTerminal,
    (parkingTerminal) => parkingTerminal.checkinImages,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn({ name: 'terminal_id' })
  terminal: ParkingTerminal;
}
