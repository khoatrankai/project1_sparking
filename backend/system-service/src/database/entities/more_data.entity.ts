import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TypeMores } from './type_more.entity';
@Entity('more_data')
export class MoreDatas {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  more_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_more: string;

  @Column({ type: 'varchar', length: 50 })
  tag_more: string;

  @ManyToOne(() => TypeMores, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'type_more' })
  type_more: TypeMores;
}
