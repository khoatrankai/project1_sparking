import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Activities } from './activity.entity';
import { TypeActivities } from './type_activity.entity';
@Entity('Status_activity')
export class StatusActivities {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  status_activity_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @ManyToOne(() => TypeActivities,typeActivity => typeActivity.status)
  @JoinColumn({ name: 'type' })
  type_activity: TypeActivities;

  @OneToMany(() => Activities, activity => activity.status)
  activity: Activities[];

}