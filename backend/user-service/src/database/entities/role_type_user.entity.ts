import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CategoryRoleUser } from './category_role_user.entity';
import { ListGroupRole } from './list_group_role.entity';
import { RoleUser } from './role_user.entity';

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

  @OneToMany(() => ListGroupRole, (groupRole) => groupRole.role_type)
  group_role: ListGroupRole[];

  @OneToMany(() => RoleUser, (roleUser) => roleUser.role_type)
  role_user: RoleUser[];
}
