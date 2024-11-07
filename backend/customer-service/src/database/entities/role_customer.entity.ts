import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { RoleTypeCustomer } from './role_type_customer.entity';
import { AccountCustomers } from './account_customers.entity';
import { CustomerInfo } from './customer_info.entity';

@Entity('Role_customer')
export class RoleCustomer {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_id: string;

  @ManyToOne(() => RoleTypeCustomer)
  @JoinColumn({ name: 'role_type_id' })
  role_type: RoleTypeCustomer;

  @ManyToOne(() => AccountCustomers)
  @JoinColumn({ name: 'customer_id' })
  customer: AccountCustomers;

  @ManyToOne(() => CustomerInfo)
  @JoinColumn({ name: 'info_id' })
  info_company: CustomerInfo;

  @Column({ type: 'boolean', default: false })
  status: boolean;
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}