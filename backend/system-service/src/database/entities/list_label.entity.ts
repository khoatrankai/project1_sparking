import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Label } from './label.entity';

@Entity('List_label')
export class ListLabel {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  group_label_id: string;

  @Column({ type: 'varchar', length: 50 })
  type_label: string;

  @Column({ type: 'varchar', length: 50 })
  customer: string;

  @ManyToOne(() => Label,{onDelete:'SET NULL'})
  @JoinColumn({ name: 'type_label' })
  label: Label;
}