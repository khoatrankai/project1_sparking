import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class TypeContract {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_type: string;

  @Column({ type: 'int', default: 0 })
  count: number;
}