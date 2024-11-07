import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { UnitProduct } from './unit_product.entity';

@Entity('List_use_product')
export class ListUseProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  use_id: string;

  @Column({ type: 'enum', enum: ['ĐX', 'BG', 'HĐ'], default: 'ĐX' })
  type_use: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type_use_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_product: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product' })
  product: Product;

  @ManyToOne(() => UnitProduct)
  @JoinColumn({ name: 'unit_product' })
  unit_product: UnitProduct;

  @Column({ type: 'int' })
  vat: number;

  @Column({ type: 'int' })
  price_product: number;

  @Column({ type: 'int', default: 1 })
  quantity_product: number;

  @Column({type: 'text'})
  description:string
}