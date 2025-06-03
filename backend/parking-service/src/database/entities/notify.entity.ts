import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountUsers } from './account_users.entity';
import { AccountAdmin } from './account_admin.entity';
// import { v4 as uuidv4 } from 'uuid';

@Entity('notify')
export class Notify {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  link: string;

   @Column({
    type: 'enum',
    enum: ['public', 'delete', 'private'],
    default: 'public',
  })
  status: string;

  @ManyToOne(() => AccountAdmin, accountAdmin => accountAdmin.notifies)
  @JoinColumn({ name: 'admin' })
  admin: AccountAdmin;

  @ManyToOne(() => AccountUsers, accountUsers => accountUsers.notifies)
  @JoinColumn({ name: 'account' })
  account: AccountUsers;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
