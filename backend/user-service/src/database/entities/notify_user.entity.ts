import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Notify } from './notify.entity';
import { AccountUsers } from './account_users.entity';
@Entity('notify_user')
export class NotifyUser {
  @PrimaryGeneratedColumn('uuid')
  notify_user_id: string;

  @ManyToOne(() => AccountUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user: AccountUsers;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @ManyToOne(() => Notify, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'notify' })
  notify: Notify;
}
