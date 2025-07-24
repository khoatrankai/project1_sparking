import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TypeProject } from './type_project.entity';
import { NotifyProject } from './notify.entity';
import { Contractor } from './contractor';
import { RoleUser } from './role_user.entity';
import { ChatGroup } from './chat_group.entity';
import { Chat } from './chat.entity';

@Entity('projects')
export class Projects {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  project_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: ['waiting', 'start', 'pause', 'cancel', 'completed'],
    default: 'waiting',
  })
  status: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  time_job: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_support: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  customer: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  opportunity: string;

  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true })
  end_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => TypeProject, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'type' })
  type: TypeProject;

  @Column({ type: 'varchar', nullable: true })
  picture_url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => NotifyProject, notifyProject => notifyProject.project)
  notify: NotifyProject[];

  @OneToMany(() => Contractor, (contractor) => contractor.project)
  contractors: Contractor[];

  @OneToMany(() => RoleUser, roleUser => roleUser.project)
  users: RoleUser[];

  @OneToMany(() => ChatGroup, chatGroup => chatGroup.project)
  chat_group: ChatGroup[];
  
  @OneToMany(() => Chat, chat => chat.project)
  chat: Chat[];
}
