import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Role_type_user')
export class RoleTypeUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_type_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_role: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;
}