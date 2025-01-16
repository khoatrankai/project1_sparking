import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { AuthUser } from './auth_user.entity';
import { ParkingSession } from './parking_parkingsession.entity';

@Entity('parking_claimpromotionv2')
@Unique(['oldId']) // Đảm bảo tính duy nhất cho cột old_id
export class ParkingClaimPromotionV2 {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 250, name: 'old_id', nullable: true })
  oldId: string;

  @ManyToOne(
    () => ParkingSession,
    (parkingSession) => parkingSession.claimPromotionsV2,
    {
      nullable: true,
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;

  @ManyToOne(() => AuthUser, (authUser) => authUser.claimPromotionsV2, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @Column({ type: 'int', name: 'amount_a' })
  amountA: number;

  @Column({ type: 'int', name: 'amount_b' })
  amountB: number;

  @Column({ type: 'int', name: 'amount_c' })
  amountC: number;

  @Column({ type: 'int', name: 'amount_d' })
  amountD: number;

  @Column({ type: 'int', name: 'amount_e' })
  amountE: number;

  @Column({ type: 'date', name: 'client_time', nullable: true })
  clientTime: string;

  @Column({ type: 'datetime', name: 'server_time' })
  serverTime: Date;

  @Column({ type: 'tinyint', name: 'used', default: 0 })
  used: boolean;

  @Column({ type: 'longtext', name: 'notes', nullable: true })
  notes: string;
}
