import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ParkingVehicleBlacklist } from "./parking_vehiclebalcklist.entity";
import { ParkingVehicleRegistration } from "./parking_vehicleregistration.entity";
import { ParkingVehicleRegistrationAuditLogEntry } from "./parking_vehicleregistrationauditlogentry.entity";
import { ParkingDepositActionFee } from "./parking_depositactionfee.entity";

@Entity('parking_vehicletype')
export class ParkingVehicleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  category: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('int', { nullable: true })
  slot_id: number;

  @Column('varchar', { length: 45, nullable: true })
  code: string;

  @Column('timestamp', { nullable: true })
  timestamp: Date;

  @OneToMany(() => ParkingVehicleBlacklist, (post) => post.vehicleType)
  parkingVehicleBlacklists: ParkingVehicleBlacklist[];

  @OneToMany(() => ParkingVehicleRegistration, (post) => post.vehicleType)
  parkingVehicleRegistrations: ParkingVehicleRegistration[];

@OneToMany(() => ParkingVehicleRegistrationAuditLogEntry, (post) => post.vehicleType)
parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];

    @OneToMany(() => ParkingDepositActionFee, (post) => post.vehicle_type_id)
    depositactionFees: ParkingDepositActionFee[];
}