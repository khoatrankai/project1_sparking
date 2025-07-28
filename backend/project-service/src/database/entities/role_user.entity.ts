import { Entity, PrimaryColumn, Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany,ManyToOne,JoinColumn} from 'typeorm';
import { RoleProject } from './role_project.entity';
import { Projects } from './project.entity';

@Entity()
export class RoleUser {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user: string;

  @ManyToOne(() => Projects, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project' })
  project: Projects;

  @ManyToOne(() => RoleProject, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role' })
  role: RoleProject;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}