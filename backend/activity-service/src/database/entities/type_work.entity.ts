import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Works } from './work.entity';
import { StatusWork } from './status_work.entity';
@Entity('type_work')
export class TypeWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_work_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @OneToMany(() => Works, (work) => work.type)
  work: Works[];

  @OneToMany(() => StatusWork, (statuswork) => statuswork.type_work)
  status: StatusWork[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
