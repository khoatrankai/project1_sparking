import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Products } from './product.entity';
@Entity('list_detail')
export class ListDetail {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  detail_id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Products, (product) => product.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product' })
  product: Products;
}
