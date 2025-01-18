import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { AccountUsers } from './account_users.entity';
import { ListGroupRole } from './list_group_role.entity';

@Entity('group_user')
export class GroupUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  group_id: string;

  @Column({ type: 'text' })
  name_group: string;

  @OneToMany(() => AccountUsers, (accountUser) => accountUser.group_user)
  users: AccountUsers[];

  @OneToMany(() => ListGroupRole, (groupRole) => groupRole.group_user)
  list_role: ListGroupRole[];
}
