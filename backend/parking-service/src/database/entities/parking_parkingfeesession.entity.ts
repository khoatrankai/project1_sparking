import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { ParkingSession } from "./parking_parkingsession.entity";
import { ParkingVehicleType } from "./parking_vehicletype.entity";

@Entity('parking_parkingfeesession')
export class ParkingFeeSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingSession)
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;

  @Column({ length: 255 })
  card_id: string;

  @Column({ length: 255 })
  vehicle_number: string;

  @Column()
  parking_fee: number;

  @Column({ length: 1000 })
  parking_fee_detail: string;

  @Column()
  calculation_time: Date;

  @Column()
  payment_date: Date;

  @Column({ length: 10 })
  session_type: string;

  @ManyToOne(() => ParkingVehicleType)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: ParkingVehicleType;

  @Column()
  is_vehicle_registration: boolean;

  @Column({ type: 'timestamp', nullable: true })
  timestamp: Date;
}