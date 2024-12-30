import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Opportunities } from './opportunity.entity';
@Entity('Type_opportunities')
export class TypeOpportunities {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_opportunity_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @OneToMany(() => Opportunities, opportunity => opportunity.type_opportunity)
  opportunities: Opportunities[];

}