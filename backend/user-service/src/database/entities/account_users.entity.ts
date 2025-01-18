import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { RoleUser } from './role_user.entity';
import { GroupUser } from './group_user.entity';

@Entity('account_users')
export class AccountUsers {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'varchar', length: 20 })
  first_name: string;

  @Column({ type: 'varchar', length: 20 })
  last_name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  picture_url: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  link_facebook: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  link_in: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  link_skype: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sign_name: string;

  @Column({
    type: 'enum',
    enum: ['active', 'delete', 'hide'],
    default: 'active',
  })
  status: string;

  @OneToMany(() => RoleUser, (roleUser) => roleUser.user_info)
  role_user: RoleUser[];

  @ManyToOne(() => GroupUser, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'group_user' })
  group_user: GroupUser;
}
