import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { MoreDatas } from './more_data.entity';
@Entity('List_more')
export class ListMore {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  list_more_id: string;

  @ManyToOne(() => MoreDatas,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'more_data' })
  more_data: MoreDatas;

  @Column({ type: 'varchar', length: 50 })
  target_id: string;

  @Column({ type: 'text' })
  description: string;

}