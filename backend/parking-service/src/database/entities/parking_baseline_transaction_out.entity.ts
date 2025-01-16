import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_baseline_transaction_out')
export class ParkingBaselineTransactionOut {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  check_out_time_day: string;

  @Column({ nullable: true })
  check_out_time_week: string;

  @Column({ nullable: true })
  check_out_time_month: string;

  @Column({ nullable: true })
  check_out_time_year: string;

  @Column()
  vehicle_type: number;

  @Column({ default: 0 })
  transaction_count: number;

  @Column({ default: 0 })
  parking_fee: number;

  @Column({ default: 0 })
  guest_transaction_count: number;

  @Column({ default: 0 })
  registered_transaction_count: number;
}
