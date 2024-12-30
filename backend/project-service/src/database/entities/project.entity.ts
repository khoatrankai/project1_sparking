import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TypeProject } from './type_project.entity';

@Entity('Projects')
export class Projects {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  project_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ 
    type: 'enum', 
    enum: ['waiting', 'start', 'pause', 'cancel', 'completed'], 
    default: 'waiting' 
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

  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true })
  end_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => TypeProject)
  @JoinColumn({ name: 'type', })
  type: TypeProject;

  @Column({ type: 'varchar', nullable: true })
  picture_url: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
