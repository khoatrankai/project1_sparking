import { Entity, Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { AuthGroup } from "./auth_group.entity";
import { AuthPermission } from "./auth_permission.entity";

@Entity('auth_group_permissions')
@Unique(['group', 'permission'])
export class AuthGroupPermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthGroup, (authGroup) => authGroup.groupPermissions, { eager: true })
  @JoinColumn({ name: 'group_id' })
  group: AuthGroup;

  @ManyToOne(() => AuthPermission, (authPermission) => authPermission.groupPermissions, { eager: true })
  @JoinColumn({ name: 'permission_id' })
  permission: AuthPermission;
}