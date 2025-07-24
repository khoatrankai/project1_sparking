import { Entity, PrimaryColumn, Column, OneToMany,ManyToOne,JoinColumn } from 'typeorm';
import { RoleUser } from './role_user.entity';
import { Projects } from './project.entity';
import { ContentGroup } from './content_group.entity';
import { Members } from './member.entity';

@Entity()
export class ChatGroup {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  head: string;

  @ManyToOne(() => Projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project' })
  project: Projects;

  @OneToMany(() => Members, members => members.chat_group)
  members: Members[];

  @OneToMany(() => ContentGroup, contentGroup => contentGroup.chat_group)
  contents: ContentGroup[];
}