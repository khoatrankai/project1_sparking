import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('labels')
export class Label {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  label_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_label: string;

  @Column({ type: 'int', default: 0 })
  count: number;
}
