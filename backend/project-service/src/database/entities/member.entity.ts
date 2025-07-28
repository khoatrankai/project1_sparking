import { Entity, PrimaryColumn, Column, OneToMany,
  CreateDateColumn,
  UpdateDateColumn,ManyToOne,JoinColumn } from 'typeorm';
import { RoleUser } from './role_user.entity';
import { Projects } from './project.entity';
import { ChatGroup } from './chat_group.entity';

export enum RoleType {
  ADMIN = 'admin',
  USER = 'user'
}


@Entity()
export class Members {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @ManyToOne(() => ChatGroup, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_group' })
  chat_group: ChatGroup;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}