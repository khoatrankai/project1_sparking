import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Asset } from './asset.entity';

export enum ChangeType {
  NEW = 'new',
  IN_USE = 'in_use',
  UNDER_REPAIR = 'under_repair',
  RETIRED = 'retired',
  DAMAGED = 'damaged',
  LOST = 'lost',
  DISPOSED = 'disposed',
}

@Entity('asset_status')
export class AssetStatus {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;


  @Column({
    type: 'enum',
    enum: ChangeType,
  })
  change_type: ChangeType;

  @Column({ type: 'varchar', length: 50,nullable:true })
  user: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  end_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  old_value?: string;

  @Column({ type: 'text', nullable: true })
  new_value?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Asset, (asset) => asset.asset_status, {
      onDelete: 'CASCADE',
    })
  @JoinColumn({ name: 'asset' })
  asset: Asset;
}