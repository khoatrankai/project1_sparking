import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Opportunities } from './opportunity.entity';
@Entity('Type_source')
export class TypeSources {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_source_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Opportunities, opportunity => opportunity.opportunity_id)
  opportunities: Opportunities[];

}