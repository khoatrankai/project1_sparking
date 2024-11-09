import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {  Works } from './work.entity';
import { TypeWork } from './type_work.entity';
@Entity('Status_work')
export class StatusWork {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  status_work_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @ManyToOne(() => TypeWork,typework => typework.status)
  @JoinColumn({ name: 'type' })
  type_work: TypeWork;

  @OneToMany(() => Works, work => work.status)
  work: Works[];

}