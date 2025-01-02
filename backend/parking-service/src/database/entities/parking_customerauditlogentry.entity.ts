import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ParkingApartment } from "./parking_apartment.entity";
import { ParkingBuilding } from "./parking_building.entity";
import { ParkingCompany } from "./parking_company.entity";
import { ParkingCustomerType } from "./parking_customertype.entity";
import { AuthUser } from "./auth_user.entity";

@Entity('parking_customerauditlogentry')
export class ParkingCustomerAuditLogEntry {
  @PrimaryGeneratedColumn({ name: 'action_id' })
  actionId: number;

  @ManyToOne(() => ParkingApartment, (apartment) => apartment.customerAuditLogEntry, { nullable: true })
  @JoinColumn({ name: 'apartment_id' })
  apartment: ParkingApartment;

  @ManyToOne(() => ParkingBuilding, (building) => building.customerAuditLogEntry, { nullable: true })
  @JoinColumn({ name: 'building_id' })
  building: ParkingBuilding;

  @ManyToOne(() => ParkingCompany, (company) => company.customerAuditLogEntry, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: ParkingCompany;

  @ManyToOne(() => ParkingCustomerType, (customerType) => customerType.customerAuditLogEntry, { nullable: true })
  @JoinColumn({ name: 'customer_type_id' })
  customerType: ParkingCustomerType;

  @Column({ type: 'varchar', length: 255, name: 'customer_name' })
  customerName: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_id' })
  customerId: string;

  @Column({ type: 'date', name: 'customer_birthday', nullable: true })
  customerBirthday: string;

  @Column({ type: 'varchar', length: 100, name: 'customer_avatar' })
  customerAvatar: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_phone' })
  customerPhone: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_mobile' })
  customerMobile: string;

  @Column({ type: 'varchar', length: 255, name: 'customer_email' })
  customerEmail: string;

  @Column({ type: 'varchar', length: 100, name: 'order_register_name' })
  orderRegisterName: string;

  @Column({ type: 'varchar', length: 200, name: 'order_register_address' })
  orderRegisterAddress: string;

  @Column({ type: 'varchar', length: 50, name: 'order_tax_code' })
  orderTaxCode: string;

  @Column({ type: 'tinyint', name: 'messaging_via_sms' })
  messagingViaSms: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_phone' })
  messagingViaPhone: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_email' })
  messagingViaEmail: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_apart_mail' })
  messagingViaApartMail: boolean;

  @Column({ type: 'tinyint', name: 'messaging_via_wiper_mail' })
  messagingViaWiperMail: boolean;

  @Column({ type: 'varchar', length: 255, name: 'messaging_sms_phone' })
  messagingSmsPhone: string;

  @Column({ type: 'varchar', length: 255, name: 'messaging_phone' })
  messagingPhone: string;

  @Column({ type: 'varchar', length: 255, name: 'messaging_email' })
  messagingEmail: string;

  @Column({ type: 'varchar', length: 255, name: 'messaging_address' })
  messagingAddress: string;

  @ManyToOne(() => AuthUser, (user) => user.customerAuditLogEntry, { nullable: true })
  @JoinColumn({ name: 'action_user_id' })
  actionUser: AuthUser;

  @Column({ type: 'datetime', name: 'action_date' })
  actionDate: Date;

  @Column({ type: 'varchar', length: 1, name: 'action_type' })
  actionType: string;
}