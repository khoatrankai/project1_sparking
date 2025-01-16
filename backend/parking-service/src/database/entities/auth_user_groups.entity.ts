import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthUser } from './auth_user.entity';
import { AuthGroup } from './auth_group.entity';

@Entity('auth_user_groups')
export class AuthUserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthUser, (authUser) => authUser.authUserGroups, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @ManyToOne(() => AuthGroup, (authGroup) => authGroup.authUserGroups, {
    eager: true,
  })
  @JoinColumn({ name: 'group_id' })
  group: AuthGroup;
}
