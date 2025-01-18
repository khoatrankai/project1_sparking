import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RoleTypeUser } from './role_type_user.entity';
import { GroupUser } from './group_user.entity';

@Entity('list_group_role')
export class ListGroupRole {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  list_id: string;

  @ManyToOne(() => RoleTypeUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_type' })
  role_type: RoleTypeUser;

  @ManyToOne(() => GroupUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_user' })
  group_user: GroupUser;
}
