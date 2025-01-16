import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryRoleUser } from './category_role_user.entity';

@Entity('role_type_user')
export class RoleTypeUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_type_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_role: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @ManyToOne(() => CategoryRoleUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_role' })
  category_role: CategoryRoleUser;
}
