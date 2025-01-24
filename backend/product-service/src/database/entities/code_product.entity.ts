import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Products } from './product.entity';
import { HistoryCodeProduct } from './history_code_product.entity';
import { HistoryReportProduct } from './history_report_product.entity';

@Entity('code_product')
export class CodeProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  code_product_id: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({
    type: 'enum',
    enum: ['selled', 'borrowed', 'inventory', 'export'],
    default: 'inventory',
  })
  status: string;

  @ManyToOne(() => Products, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product' })
  product: Products;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => HistoryCodeProduct, (history) => history.code_product)
  history: HistoryCodeProduct[];

  @OneToMany(() => HistoryReportProduct, (history) => history.code_product)
  report: HistoryReportProduct[];
}
