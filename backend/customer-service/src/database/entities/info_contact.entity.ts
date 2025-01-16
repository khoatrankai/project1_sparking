import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { AccountCustomers } from './account_customers.entity';
import { CustomerInfo } from './customer_info.entity';

@Entity('info_contact')
export class InfoContact {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  info_contact_id: string;

  @ManyToOne(() => AccountCustomers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: AccountCustomers;

  @ManyToOne(() => CustomerInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'info_id' })
  info_company: CustomerInfo;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
