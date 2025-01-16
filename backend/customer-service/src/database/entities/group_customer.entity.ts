import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CustomerInfo } from './customer_info.entity';

@Entity('group_customer')
export class GroupCustomer {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  group_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_group: string;

  @Column({ type: 'int', default: 0 })
  count: number;

  @OneToMany(() => CustomerInfo, (customerInfo) => customerInfo.group_customer)
  customers: CustomerInfo[];
}
