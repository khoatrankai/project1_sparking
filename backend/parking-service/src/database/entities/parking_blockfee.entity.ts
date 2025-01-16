import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingFee } from './parking_parkingfee.entity';

@Entity('parking_blockfee')
export class ParkingBlockFee {
  @PrimaryGeneratedColumn()
  id: number;

  //   @Column()
  //   parking_fee_id: number;

  @Column()
  first_block_duration: number;

  @Column()
  next_block_duration: number;

  @Column()
  first_block_fee: number;

  @Column()
  next_block_fee: number;

  @Column()
  max_block_duration: number;

  @Column()
  max_block_fee: number;

  @Column()
  in_day_block_fee: number;

  @Column()
  night_block_fee: number;

  @ManyToOne(() => ParkingFee)
  @JoinColumn({ name: 'parking_fee_id' })
  parkingFee: ParkingFee;
}
