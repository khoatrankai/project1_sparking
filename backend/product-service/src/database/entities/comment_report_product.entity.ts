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

@Entity('comment_report_product')
export class CommentReportProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  comment_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  customer: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_support: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => HistoryReportProduct, (history) => history.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'history_report' })
  history_report: HistoryReportProduct;
}
