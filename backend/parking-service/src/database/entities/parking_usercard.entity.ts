import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ParkingCard } from './parking_card.entity';
import { AuthUser } from './auth_user.entity';

@Entity('parking_usercard')
export class ParkingUserCard {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => AuthUser, (user) => user.userCards)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @ManyToOne(() => ParkingCard, (card) => card.userCards)
  @JoinColumn({ name: 'card_id' })
  card: ParkingCard;

  @Column({ type: 'varchar', name: 'card_id', unique: true })
  card_id: string;
}
