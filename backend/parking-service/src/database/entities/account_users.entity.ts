import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AccountApartment } from './account_apartment.entity';
import { Notify } from './notify.entity';
import { ChatUser } from './chat.entity';
import { Note } from './notes.entity';
import { Reports } from './reports.entity';
import { Comments } from './comments.entity';
import { Review } from './reviews.entity';
// import { GroupCustomer } from './group_customer.entity';

@Entity('account_users')
export class AccountUsers {
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

  @OneToMany(() => AccountApartment, acountApartment => acountApartment.account)
  account_apartment: AccountApartment[];

  @OneToMany(() => Notify, notify => notify.account)
  notifies: Notify[];

  @OneToMany(() => ChatUser, chat => chat.user1)
  chats_from: ChatUser[];

  @OneToMany(() => ChatUser, chat => chat.user2)
  chats_to: ChatUser[];

  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @OneToMany(() => Reports, report => report.user)
  reports: Reports[];

  @OneToMany(() => Comments, comment => comment.user)
  comments: Comments[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];
}
