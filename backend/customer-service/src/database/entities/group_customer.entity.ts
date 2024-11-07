import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Group_customer')
export class GroupCustomer {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  group_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_group: string;

  @Column({ type: 'int', default: 0 })
  count: number;
}