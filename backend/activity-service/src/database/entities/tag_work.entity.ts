import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn

} from 'typeorm';
import { Works } from './work.entity';
import { Tags } from './tag.entity';
@Entity('tag_work')
export class TagWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @ManyToOne(() => Tags, (tags) => tags.works, {
      onDelete: 'SET NULL',
    })
  @JoinColumn({ name: 'tag' })
  tag: Tags;

  @ManyToOne(() => Works, (works) => works.tags, {
      onDelete: 'SET NULL',
    })
  @JoinColumn({ name: 'work' })
  work: Works;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
