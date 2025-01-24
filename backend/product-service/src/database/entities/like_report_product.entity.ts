import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { HistoryReportProduct } from './history_report_product.entity';

@Entity('like_report_product')
export class LikeReportProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  like_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  customer: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_support: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => HistoryReportProduct, (history) => history.like, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'history_report' })
  history_report: HistoryReportProduct;
}
