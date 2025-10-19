import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TagWork } from './tag_work.entity';
@Entity('tag')
export class Tags {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  tag_id: string;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @OneToMany(() => TagWork, (work) => work.tag)
  works: TagWork[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
