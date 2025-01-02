import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthGroupPermissions } from "./auth_group_permission.entity";
import { AuthUserGroup } from "./auth_user_groups.entity";

@Entity('auth_group')
export class AuthGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  name: string;


  @OneToMany(() => AuthGroupPermissions, (post) => post.group)
  groupPermissions: AuthGroupPermissions[]

  @OneToMany(() => AuthUserGroup, (post) => post.group)
  authUserGroups: AuthUserGroup[];
}