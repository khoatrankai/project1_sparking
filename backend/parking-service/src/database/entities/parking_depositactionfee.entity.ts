import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParkingCustomerType } from './parking_customertype.entity';
import { ParkingVehicleType } from './parking_vehicletype.entity';

@Entity('parking_depositactionfee')
export class ParkingDepositActionFee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => ParkingCustomerType, { nullable: true })
  @JoinColumn({ name: 'customer_type_id' })
  customer_type_id: ParkingCustomerType;

  @Column()
  fee: number;

  @ManyToOne(() => ParkingVehicleType, { nullable: true })
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicle_type_id: ParkingVehicleType;
}
