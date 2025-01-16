import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ParkingVehicleRegistration } from './parking_vehicleregistration.entity';

@Entity('parking_pauseresumehistory')
export class PauseResumeHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingVehicleRegistration, { nullable: true })
  @JoinColumn({ name: 'vehicle_registration_id' })
  vehicleRegistration: ParkingVehicleRegistration;

  @Column({ nullable: true })
  expired_date: Date;

  @Column()
  request_date: Date;

  @Column({ nullable: true })
  start_date: Date;

  @Column()
  request_type: number;

  @Column({ length: 200 })
  request_notes: string;

  @Column()
  remain_duration: number;

  @Column()
  used: boolean;
}
