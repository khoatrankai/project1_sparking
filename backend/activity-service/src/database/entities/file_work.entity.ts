import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FolderWork } from './folder_work.entity';

@Entity('file_work')
export class FileWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  file_id: string;

  @Column({ type: 'text',nullable:true })
  name: string;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne(() => FolderWork, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'folder_work' })
  folder_work: FolderWork;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
