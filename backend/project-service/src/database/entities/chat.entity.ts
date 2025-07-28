import { Entity, PrimaryColumn, Column, OneToMany,ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,JoinColumn } from 'typeorm';
import { Projects } from './project.entity';
import { Contents } from './content.entity';

@Entity()
export class Chat {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'text'})
  name_one: string;

  @Column({ type: 'text'})
  name_two: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_one: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_two: string;

  @ManyToOne(() => Projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project' })
  project: Projects;

  @OneToMany(() => Contents, content => content.chat)
  contents: Contents[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}