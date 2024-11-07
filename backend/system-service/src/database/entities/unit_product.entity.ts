import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Unit_product')
export class UnitProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  unit_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_unit: string;
}