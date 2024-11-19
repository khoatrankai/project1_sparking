import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { MoreDatas } from './more_data.entity';
@Entity('Type_mores')
export class TypeMores {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_type: string;

  @Column({ type: 'varchar', length: 50 })
  tag_type: string;

  @OneToMany(() => MoreDatas, moreData => moreData.type_more)
  more_data: MoreDatas[];

}