import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { GroupCustomer } from './group_customer.entity';
import { InfoContact } from './info_contact.entity';

@Entity('customer_info')
export class CustomerInfo {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  info_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_company: string;

  @ManyToOne(() => GroupCustomer, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'group_customer' })
  group_customer: GroupCustomer;

  @Column({ type: 'varchar', length: 50 })
  tax_code: string;

  @Column({ type: 'varchar', length: 50 })
  province: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  opportunity: string;

  @Column({ type: 'varchar', length: 12 })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  website: string;

  @Column({ type: 'enum', enum: ['vnd', 'usd'], default: 'vnd' })
  type_money: string;

  @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
  status_active: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_establish: Date;

  @Column({ type: 'varchar', length: 50 })
  address_payment: string;

  @Column({ type: 'varchar', length: 50 })
  address_delivery: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province_payment: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province_delivery: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  staff_support: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true })
  picture_url: string;

  @OneToMany(() => InfoContact, (infoContact) => infoContact.info_company)
  infoContacts: InfoContact[];
}
