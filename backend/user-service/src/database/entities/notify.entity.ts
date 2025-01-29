import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NotifyUser } from './notify_user.entity';
import { NotifyRole } from './notify_role.entity';
// import { v4 as uuidv4 } from 'uuid';

@Entity('notify')
export class Notify {
  @PrimaryGeneratedColumn('uuid')
  notify_id: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => NotifyRole, (notifyRole) => notifyRole.notify)
  notify_role: NotifyRole[];

  @Column({ type: 'text', nullable: true })
  link: string;

  @OneToMany(() => NotifyUser, (notifyUser) => notifyUser.notify)
  notify_user: NotifyUser[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
