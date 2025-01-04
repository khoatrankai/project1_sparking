import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
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

  @Column({ type: 'int', nullable: true })
  position:number

  @ManyToOne(() => TypeWork,typework => typework.status, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'type_work' })
  type_work: TypeWork;

  @OneToMany(() => Works, work => work.status)
  work: Works[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}