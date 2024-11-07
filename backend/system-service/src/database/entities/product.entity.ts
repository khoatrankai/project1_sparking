import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PictureProduct } from './picture_product.entity';
import { UnitProduct } from './unit_product.entity';
// import { TypeProduct } from './type_product.entity';

@Entity('Products')
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  product_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_product: string;

  @Column({ type: 'enum', enum: ['TB', 'VT'], default: 'TB' })
  type: string;

  @Column({ type: 'int' })
  price_product: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  vat: number;

  @ManyToOne(() => UnitProduct)
  @JoinColumn({ name: 'unit_product' })
  unit_product: UnitProduct;

  @Column({ type: 'enum', enum: ['active', 'delete', 'hide'], default: 'active' })
  status: string;

  @OneToMany(() => PictureProduct, pictureProducts => pictureProducts.product)
  picture_urls: PictureProduct[];


}