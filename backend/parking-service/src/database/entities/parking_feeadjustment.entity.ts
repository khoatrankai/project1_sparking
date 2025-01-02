import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('parking_feeadjustment')
export class ParkingFeeAdjustment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  vehicle_type: number;

  @Column({ type: 'datetime', nullable: true })
  time: Date;

  @Column({ nullable: true })
  fee: number;

  @Column({ length: 1000, nullable: true })
  remark: string;
}