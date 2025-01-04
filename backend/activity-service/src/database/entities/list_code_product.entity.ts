import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Activities } from './activity.entity';

@Entity()
export class ListCodeProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  list_id: string;

  @Column({ type: 'varchar', length: 50 })
  code_product: string;

  @ManyToOne(() => Activities,activity => activity.list_code_product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity' })
  activity: Activities;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}