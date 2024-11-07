import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('Picture_product')
export class PictureProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  picture_id: string;

  @Column({ type: 'varchar', length: 50 })
  url: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}