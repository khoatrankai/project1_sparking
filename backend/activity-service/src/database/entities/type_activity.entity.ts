import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Activities } from './activity.entity';
import { StatusActivities } from './status_activity.entity';
@Entity('Type_activity')
export class TypeActivities {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_activity_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @OneToMany(() => Activities, activity => activity.type)
  activity: Activities[];

  @OneToMany(() => StatusActivities,  statusActivity => statusActivity.type_activity)
  status: StatusActivities[];

}