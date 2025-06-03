// users.entity.ts
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Apartment } from './apartments.entity';
import { Notify } from './notifies.entity';
import { Chat } from './chats.entity';
import { Activity } from './activities.entity';
import { Management } from './managements.entity';
import { Note } from './notes.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  last_login: Date;

  @Column({ type: 'tinyint' })
  is_superuser: number;

  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ type: 'tinyint' })
  is_staff: number;

  @Column({ type: 'tinyint' })
  is_active: number;

  @OneToMany(() => Apartment, apartment => apartment.user)
  apartments: Apartment[];

  @OneToMany(() => Notify, notify => notify.user)
  notifies: Notify[];

  @OneToMany(() => Chat, chat => chat.user1)
  chats_from: Chat[];

  @OneToMany(() => Chat, chat => chat.user2)
  chats_to: Chat[];

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Activity, activity => activity.user)
  activities: Activity[];

  @OneToMany(() => Management, management => management.user)
  managements: Management[];

  @OneToMany(() => Note, note => note.user)
  notes: Note[];
}
