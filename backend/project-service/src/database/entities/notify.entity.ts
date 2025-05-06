import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Projects } from './project.entity';

@Entity()
export class NotifyProject {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  notify_id: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_create: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;

  @ManyToOne(() => Projects, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project' })
  project: Projects;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}