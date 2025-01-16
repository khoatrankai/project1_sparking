import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { RoleTypeUser } from './role_type_user.entity';

@Entity('category_role_user')
export class CategoryRoleUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  category_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_category: string;

  @OneToMany(() => RoleTypeUser, (roleType) => roleType.category_role)
  role_type: RoleTypeUser[];
}
