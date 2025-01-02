import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingFee } from "./parking_parkingfee.entity";

@Entity('parking_turnfee')
export class ParkingTurnFee {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => ParkingFee, (parkingFee) => parkingFee.turnFees)
  @JoinColumn({ name: 'parking_fee_id' })
  parkingFee: ParkingFee;

  @Column({ type: 'time', name: 'day_start_time' })
  dayStartTime: string;

  @Column({ type: 'time', name: 'day_end_time' })
  dayEndTime: string;

  @Column({ type: 'time', name: 'night_start_time' })
  nightStartTime: string;

  @Column({ type: 'time', name: 'night_end_time' })
  nightEndTime: string;

  @Column({ type: 'int', name: 'day_fee' })
  dayFee: number;

  @Column({ type: 'int', name: 'night_fee' })
  nightFee: number;

  @Column({ type: 'int', name: 'overnight_fee' })
  overnightFee: number;
}