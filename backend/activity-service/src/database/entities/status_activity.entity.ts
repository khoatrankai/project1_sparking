import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
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

  @Column({ type: 'int', nullable: true })
  position:number

  @ManyToOne(() => TypeActivities,typeActivity => typeActivity.status, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_activity' })
  type_activity: TypeActivities;

  @OneToMany(() => Activities, activity => activity.status)
  activity: Activities[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}