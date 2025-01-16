import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingSession } from './parking_parkingsession.entity';
import { ParkingCard } from './parking_card.entity';

@Entity('parking_cardstatus')
export class ParkingCardStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parking_session_id: number;

  @Column()
  status: number;

  @ManyToOne(() => ParkingSession, (session) => session.cardStatuses)
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;

  @ManyToOne(() => ParkingCard, (card) => card.cardStatuses)
  @JoinColumn({ name: 'card_id' })
  parkingCard: ParkingCard;
}
