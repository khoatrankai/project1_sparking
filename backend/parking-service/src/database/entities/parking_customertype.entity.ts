import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ParkingCustomer } from "./parking_customer.entity";
import { ParkingCustomerAuditLogEntry } from "./parking_customerauditlogentry.entity";

@Entity('parking_customertype')
export class ParkingCustomerType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => ParkingCustomer, (post) => post.customerType)
  customers: ParkingCustomer[]

  @OneToMany(() => ParkingCustomer, (post) => post.customerType)
  customerAuditLogEntry: ParkingCustomerAuditLogEntry[]
}