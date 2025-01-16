import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('parking_checkoutexceptioninfo')
export class ParkingCheckoutExceptionInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 4000 })
  notes: string;

  @Column({ type: 'int' })
  parking_fee: number;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
