import { Entity, PrimaryColumn, Column, OneToMany,ManyToOne,JoinColumn } from 'typeorm';
import { RoleUser } from './role_user.entity';
import { Projects } from './project.entity';
import { ChatGroup } from './chat_group.entity';
import { Chat } from './chat.entity';

@Entity()
export class Contents {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'text'})
  link: string;

  @Column({ type: 'text'})
  content: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user: string;

  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat' })
  chat: Chat;

  @Column({ type: "simple-array" })
  user_seen: string[]
}