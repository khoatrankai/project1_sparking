import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
