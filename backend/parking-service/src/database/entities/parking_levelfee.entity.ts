import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ParkingCustomerType } from "./parking_customertype.entity";
import { ParkingVehicleType } from "./parking_vehicletype.entity";
import { ParkingVehicleRegistration } from "./parking_vehicleregistration.entity";
import { ParkingVehicleRegistrationAuditLogEntry } from "./parking_vehicleregistrationauditlogentry.entity";

@Entity('parking_levelfee')
export class ParkingLevelFee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => ParkingCustomerType, { nullable: true })
  @JoinColumn({ name: 'customer_type_id' })
  customerType: ParkingCustomerType;

  @ManyToOne(() => ParkingVehicleType, { nullable: true })
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicleType: ParkingVehicleType;

  @Column()
  fee: number;

  @OneToMany(() => ParkingVehicleRegistration, (post) => post.levelFee)
  parkingVehicleRegistrations: ParkingVehicleRegistration[];

  @OneToMany(() => ParkingVehicleRegistrationAuditLogEntry, (post) => post.levelFee)
  parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];
}