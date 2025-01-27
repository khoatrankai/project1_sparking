import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { HistoryCodeProduct } from './history_code_product.entity';

@Entity('activity_container')
export class ActivityContainer {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  activity_container_id: string;

  @Column({
    type: 'enum',
    enum: ['import', 'export', 'status'],
    default: 'import',
  })
  type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  customer: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  activity: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => HistoryCodeProduct, (history) => history.activity_container)
  list_code: HistoryCodeProduct[];
}
