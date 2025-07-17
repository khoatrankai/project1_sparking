import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Asset } from './asset.entity';
export enum WarrantyStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('warranty')
export class Warranty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  date_start: Date;

  @Column({ type: 'text', nullable: true })
  reason?: string;

  @Column({ type: 'text', nullable: true })
  review?: string;

  @Column({ type: 'text', nullable: true })
  solve?: string;

  @Column({ type: 'datetime', nullable: true })
  date_end?: Date;

  @Column({
  type: 'enum',
  enum: WarrantyStatus,
  default: WarrantyStatus.PENDING,
  })
  status: WarrantyStatus;


  @Column({ type: 'text', nullable: true })
  note?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  activity?: string;

  @ManyToOne(() => Asset, (asset) => asset.warranty)
  @JoinColumn({ name: 'asset' })
  asset: Asset;
}
