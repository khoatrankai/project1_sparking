import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Asset } from './asset.entity';

@Entity('history_asset')
export class HistoryAsset {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'text'})
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'datetime', nullable: true })
  date_expired: Date;

  @ManyToOne(() => Asset, (asset) => asset.history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'asset' })
  asset: Asset;

}
