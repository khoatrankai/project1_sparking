import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Notify } from './notify.entity';
import { RoleTypeUser } from './role_type_user.entity';
@Entity('notify_role')
export class NotifyRole {
  @PrimaryGeneratedColumn('uuid')
  notify_user_id: string;

  @ManyToOne(() => RoleTypeUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role' })
  role: RoleTypeUser;

  @ManyToOne(() => Notify, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'notify' })
  notify: Notify;
}
