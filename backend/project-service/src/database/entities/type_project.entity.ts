import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Projects } from './project.entity';

@Entity()
export class TypeProject {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_id: string;

  @Column({ type: 'text'})
  name_type: string;

  @OneToMany(() => Projects, project => project.type)
  projects: Projects[];
}