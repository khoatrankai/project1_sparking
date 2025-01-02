import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthUser } from "./auth_user.entity";
import { AuthPermission } from "./auth_permission.entity";

@Entity('auth_user_user_permissions')
export class AuthUserUserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthUser, (authUser) => authUser.authUserUserPermissions, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @ManyToOne(() => AuthPermission, (authPermission) => authPermission.authUserUserPermissions, { eager: true })
  @JoinColumn({ name: 'permission_id' })
  permission: AuthPermission;
}