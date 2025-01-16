import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Activities } from './activity.entity';

@Entity('picture_activity')
export class PictureActivity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  picture_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Activities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activity' })
  activity: Activities;

  @Column({ type: 'enum', enum: ['start', 'end'], default: 'start' })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
