import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CodeProduct } from './code_product.entity';

export enum AssetStatus {
  NEW = 'new',
  IN_USE = 'in_use',
  UNDER_REPAIR = 'under_repair',
  RETIRED = 'retired',
  DAMAGED = 'damaged',
  LOST = 'lost',
  DISPOSED = 'disposed',
}

@Entity('assets')
export class Asset {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ name: 'asset_code', length: 100, unique: true })
  asset_code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => CodeProduct)
  @JoinColumn({ name: 'code_product' })
  code_product: CodeProduct;

  @Column({
    type: 'enum',
    enum: AssetStatus,
    default: AssetStatus.NEW,
  })
  status: AssetStatus;

  @Column({ type: 'varchar', length: 50,nullable:true })
  customer: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  project: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  purchase_date?: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  warranty_expiry?: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  price?: number;

  @Column({ name: 'serial_number', length: 100, nullable: true })
  serial_number?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
