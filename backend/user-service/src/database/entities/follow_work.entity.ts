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
import { NotifyUser } from './notify_user.entity';
import { TimeKeeping } from './timekeeping.entity';
import { Documents } from './document.entity';
import { Skills } from './skill.entity';
import { AccountUsers } from './account_users.entity';

@Entity('follow_work')
export class FollowWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  work: string;

  @ManyToOne(() => AccountUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: AccountUsers;
}
