import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RoleTypeUser } from './role_type_user.entity';
import { AccountUsers } from './account_users.entity';

@Entity('Role_user')
export class RoleUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  role_id: string;

  @ManyToOne(() => RoleTypeUser)
  @JoinColumn({ name: 'role_type' })
  role_type: RoleTypeUser;

  @ManyToOne(() => AccountUsers)
  @JoinColumn({ name: 'user_info' })
  user_info: AccountUsers;

  @Column({ type: 'boolean', default: false })
  status: boolean;
}