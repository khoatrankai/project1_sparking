import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ParkingCustomer } from "./parking_customer.entity";
import { ParkingCustomerAuditLogEntry } from "./parking_customerauditlogentry.entity";

@Entity('parking_company')
export class ParkingCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ length: 255, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  representative_name: string;

  @Column({ length: 255, nullable: true })
  representative_phone: string;

  @OneToMany(() => ParkingCustomer, (post) => post.company)
  customers: ParkingCustomer[]

  @OneToMany(() => ParkingCustomerAuditLogEntry, (post) => post.company)
  customerAuditLogEntry: ParkingCustomerAuditLogEntry[]
}
