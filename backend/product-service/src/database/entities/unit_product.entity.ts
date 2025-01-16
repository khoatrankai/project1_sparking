import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Products } from './product.entity';

@Entity('unit_product')
export class UnitProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  unit_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_unit: string;

  @OneToMany(() => Products, (product) => product.type)
  products: Products[];
}
