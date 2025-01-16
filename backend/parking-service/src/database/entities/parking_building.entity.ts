import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ParkingCustomer } from './parking_customer.entity';
import { ParkingCustomerAuditLogEntry } from './parking_customerauditlogentry.entity';

@Entity('parking_building')
export class ParkingBuilding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @OneToMany(() => ParkingCustomer, (post) => post.building)
  customers: ParkingCustomer[];

  @OneToMany(() => ParkingCustomerAuditLogEntry, (post) => post.building)
  customerAuditLogEntry: ParkingCustomerAuditLogEntry[];
}
