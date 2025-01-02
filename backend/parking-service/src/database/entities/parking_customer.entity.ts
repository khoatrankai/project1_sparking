import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ParkingTicketPayment } from "./parking_ticketpayment.entity";
import { ParkingVehicleRegistration } from "./parking_vehicleregistration.entity";
import { ParkingVehicleRegistrationAuditLogEntry } from "./parking_vehicleregistrationauditlogentry.entity";
import { ParkingApartment } from "./parking_apartment.entity";
import { ParkingBuilding } from "./parking_building.entity";
import { ParkingCompany } from "./parking_company.entity";
import { ParkingCustomerType } from "./parking_customertype.entity";
import { ParkingDepositPayment } from "./parking_depositpayment.entity";

@Entity('parking_customer')
export class ParkingCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParkingApartment, (apartment) => apartment.customers, { nullable: true })
  @JoinColumn({ name: 'apartment_id' })
  apartment: ParkingApartment;

  @ManyToOne(() => ParkingBuilding, (building) => building.customers, { nullable: true })
  @JoinColumn({ name: 'building_id' })
  building: ParkingBuilding;

  @ManyToOne(() => ParkingCompany, (company) => company.customers, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: ParkingCompany;

  @ManyToOne(() => ParkingCustomerType, (customerType) => customerType.customers, { nullable: true })
  @JoinColumn({ name: 'customer_type_id' })
  customerType: ParkingCustomerType;

  @Column({ type: 'varchar', length: 255, name: 'customer_name' })
  customerName: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_id' })
  customerId: string;

  @Column({ type: 'date', name: 'customer_birthday', nullable: true })
  customerBirthday: Date;

  @Column({ type: 'varchar', length: 100, name: 'customer_avatar', nullable: true })
  customerAvatar: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_phone', nullable: true })
  customerPhone: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_mobile', nullable: true })
  customerMobile: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_email', nullable: true })
  customerEmail: string;

  @Column({ type: 'varchar', length: 100, name: 'order_register_name', nullable: true })
  orderRegisterName: string;

  @Column({ type: 'varchar', length: 200, name: 'order_register_address', nullable: true })
  orderRegisterAddress: string;

  @Column({ type: 'varchar', length: 50, name: 'order_tax_code', nullable: true })
  orderTaxCode: string;

  @Column({ type: 'tinyint', name: 'messaging_via_sms', nullable: true })
  messagingViaSms: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_phone', nullable: true })
  messagingViaPhone: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_email', nullable: true })
  messagingViaEmail: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_apart_mail', nullable: true })
  messagingViaApartMail: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_wiper_mail', nullable: true })
  messagingViaWiperMail: boolean;

  @Column({ type: 'varchar', length: 255, name: 'messaging_sms_phone', nullable: true })
  messagingSmsPhone: string;

  @Column({ type: 'varchar', length: 255, name: 'messaging_phone', nullable: true })
  messagingPhone: string;

  @Column({ type: 'varchar', length: 255, name: 'messaging_email', nullable: true })
  messagingEmail: string;

  @Column({ type: 'varchar', length: 255, name: 'messaging_address', nullable: true })
  messagingAddress: string;

  @Column({ type: 'int', name: 'staff_id', nullable: true })
  staffId: number;

  @Column({ type: 'timestamp', name: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @OneToMany(() => ParkingTicketPayment, (post) => post.customer)
  ticketPayments: ParkingTicketPayment[];

  @OneToMany(() => ParkingVehicleRegistration, (post) => post.customer)
  parkingVehicleRegistrations: ParkingVehicleRegistration[];

  @OneToMany(() => ParkingVehicleRegistrationAuditLogEntry, (post) => post.customer)
  parkingVehicleRegistrationAuditLogEntries: ParkingVehicleRegistrationAuditLogEntry[];

  @OneToMany(() => ParkingDepositPayment, (post) => post.customer)
  depositPayments: ParkingDepositPayment[];
}