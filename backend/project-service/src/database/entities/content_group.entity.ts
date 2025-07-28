import { Entity, PrimaryColumn, Column, OneToMany,
  CreateDateColumn,
  UpdateDateColumn,ManyToOne,JoinColumn } from 'typeorm';
import { RoleUser } from './role_user.entity';
import { Projects } from './project.entity';
import { ChatGroup } from './chat_group.entity';

@Entity()
export class ContentGroup {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'text',nullable: true})
  link: string;

  @Column({ type: 'text',nullable: true})
  content: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user: string;

  @ManyToOne(() => ChatGroup, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_group' })
  chat_group: ChatGroup;

  @Column({ type: "simple-array" })
  user_seen: string[]

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}