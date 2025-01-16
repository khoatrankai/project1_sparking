import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { ParkingVehicleType } from './parking_vehicletype.entity';
import { ParkingTurnFee } from './parking_turnfee.entity';

@Entity('parking_parkingfee')
@Unique(['vehicleType'])
export class ParkingFee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingVehicleType)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: ParkingVehicleType;

  @Column({ length: 10 })
  calculation_method: string;

  @Column()
  min_calculation_time: number;

  @OneToMany(() => ParkingTurnFee, (post) => post.parkingFee)
  turnFees: ParkingTurnFee[];
}
