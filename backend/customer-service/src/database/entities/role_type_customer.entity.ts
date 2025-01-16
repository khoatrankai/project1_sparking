import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('role_type_customer')
export class RoleTypeCustomer {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_type_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_role: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;
}
