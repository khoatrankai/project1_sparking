import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Works } from './work.entity';

@Entity('picture_work')
export class PictureWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  picture_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Works, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work' })
  work: Works;

  @Column({ type: 'enum', enum: ['start', 'end'], default: 'start' })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
