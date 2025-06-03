import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Notify } from './notify.entity';
import { Activity } from './activities.entity';
// import { GroupCustomer } from './group_customer.entity';

@Entity('account_admin')
export class AccountAdmin {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  position: string;

  @Column({ type: 'varchar', nullable: true })
  picture_url: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], default: 'male' })
  gender: string;

  @Column({ type: 'varchar', length: 50 })
  phone_number: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_of_birth: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_active: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'delete', 'hide'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Notify, notify => notify.admin)
  notifies: Notify[];

  @OneToMany(() => Activity, activity => activity.admin)
  activities: Activity[];
}
