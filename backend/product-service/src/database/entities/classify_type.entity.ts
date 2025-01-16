import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { TypeProducts } from './type_product.entity';
@Entity('classify_type')
export class ClassifyType {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  classify_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => TypeProducts, (typeProduct) => typeProduct.classify_type)
  types_product: TypeProducts[];
}
