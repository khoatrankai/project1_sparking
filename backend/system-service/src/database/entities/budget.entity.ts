import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from 'typeorm';

@Entity('budget')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int', default: 0 })
  allocation: number;

  @Column({ type: 'int', default: 0 })
  spent: number;

  @Column({ type: 'enum', enum: ['company', 'project', 'activity','capital','hr'], default: 'company' })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
