import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Works } from './work.entity';
import { FileWork } from './file_work.entity';

@Entity('folder_work')
export class FolderWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  folder_id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Works, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'work' })
  work: Works;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => FileWork, (fileWork) => fileWork.folder_work)
  files: FileWork[];
}
