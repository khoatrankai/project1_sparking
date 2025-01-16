import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_baseline_available_slot')
export class ParkingBaselineAvailableSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  slot_count: number;

  @Column({ nullable: true })
  vehicle_type: string;
}
