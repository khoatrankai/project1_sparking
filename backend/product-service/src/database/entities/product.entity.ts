import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PictureProduct } from './picture_product.entity';
import { UnitProduct } from './unit_product.entity';
import { TypeProducts } from './type_product.entity';
import { CodeProduct } from './code_product.entity';
import { SupplierProduct } from './supplier_product.entity';
@Entity('Products')
export class Products {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  product_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => TypeProducts)
  @JoinColumn({ name: 'type' })
  type: TypeProducts;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  vat: string;

  @Column({ type: 'varchar', length: 50 })
  profit: string;

  @Column({ type: 'int' ,default:0})
  quantity: number;

  @ManyToOne(() => UnitProduct)
  @JoinColumn({ name: 'unit_product' })
  unit_product: UnitProduct;

  @Column({ type: 'enum', enum: ['active', 'delete', 'hide'], default: 'active' })
  status: string;

  @OneToMany(() => PictureProduct, pictureProducts => pictureProducts.product)
  picture_urls: PictureProduct[];

  @OneToMany(() => CodeProduct, codeProduct => codeProduct.product)
  code_product: CodeProduct[];

  @ManyToOne(() => SupplierProduct)
  @JoinColumn({ name: 'supplier_product' })
  supplier_product: SupplierProduct;
}
