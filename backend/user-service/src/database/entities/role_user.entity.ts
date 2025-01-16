import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoleTypeUser } from './role_type_user.entity';
import { AccountUsers } from './account_users.entity';

@Entity('role_user')
export class RoleUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_id: string;

  @ManyToOne(() => RoleTypeUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_type' })
  role_type: RoleTypeUser;

  @ManyToOne(() => AccountUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_info' })
  user_info: AccountUsers;

  @Column({ type: 'boolean', default: false })
  status: boolean;
}
