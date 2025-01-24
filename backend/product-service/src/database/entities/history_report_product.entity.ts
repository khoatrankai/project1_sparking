import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { CodeProduct } from './code_product.entity';
import { CommentReportProduct } from './comment_report_product.entity';
import { LikeReportProduct } from './like_report_product.entity';

@Entity('history_report_product')
export class HistoryReportProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  history_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  activity: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  customer: string;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'analysis', 'progress', 'testing', 'resolve'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_support: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => CodeProduct, (codeProduct) => codeProduct.history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'code_product' })
  code_product: CodeProduct;

  @OneToMany(() => CommentReportProduct, (comment) => comment.history_report)
  comment: CommentReportProduct[];

  @OneToMany(() => LikeReportProduct, (like) => like.history_report)
  like: LikeReportProduct[];
}
