import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ParkingVehicleType } from './parking_vehicletype.entity';
import { ParkingCurrentBlacklistState } from './parking_currentbalckliststate.entity';

@Entity('parking_vehiclebalcklist')
export class ParkingVehicleBlacklist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ParkingVehicleType,
    (vehicleType) => vehicleType.parkingVehicleBlacklists,
  )
  @JoinColumn({ name: 'vehicle_type' })
  vehicleType: ParkingVehicleType;

  @Column('varchar', { length: 10, nullable: true })
  vehicle_number: string;

  @Column('text', { nullable: true })
  notes: string;

  @OneToMany(
    () => ParkingCurrentBlacklistState,
    (terminal) => terminal.blacklist,
  )
  currentBlacklistStates: ParkingCurrentBlacklistState[];
}
