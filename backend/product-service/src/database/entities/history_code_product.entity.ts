import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { CodeProduct } from './code_product.entity';
import { ActivityContainer } from './activity_container.entity';

@Entity('history_code_product')
export class HistoryCodeProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  history_id: string;

  @Column({
    type: 'enum',
    enum: ['selled', 'borrowed', 'inventory', 'export'],
    default: 'inventory',
  })
  status: string;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  vat: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  profit: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => CodeProduct, (codeProduct) => codeProduct.history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'code_product' })
  code_product: CodeProduct;

  @ManyToOne(
    () => ActivityContainer,
    (activityContainer) => activityContainer.list_code,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'activity_container' })
  activity_container: ActivityContainer;
}
