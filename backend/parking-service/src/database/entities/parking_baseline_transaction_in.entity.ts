import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('parking_baseline_transaction_in')
export class ParkingBaselineTransactionIn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  check_in_time_day: string;

  @Column({ nullable: true })
  check_in_time_week: string;

  @Column({ nullable: true })
  check_in_time_month: string;

  @Column({ nullable: true })
  check_in_time_year: string;

  @Column()
  vehicle_type: number;

  @Column({ default: 0 })
  transaction_count: number;

  @Column({ default: 0 })
  guest_transaction_count: number;

  @Column({ default: 0 })
  registered_transaction_count: number;
}
