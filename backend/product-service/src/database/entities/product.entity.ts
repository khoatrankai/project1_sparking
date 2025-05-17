import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PictureProduct } from './picture_product.entity';
import { UnitProduct } from './unit_product.entity';
import { TypeProducts } from './type_product.entity';
import { CodeProduct } from './code_product.entity';
import { SupplierProduct } from './supplier_product.entity';
import { Brands } from './brand.entity';
import { Originals } from './original.entity';
import { ListDetail } from './list_detail.entity';
@Entity('products')
export class Products {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  product_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code_original: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => TypeProducts, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'type' })
  type: TypeProducts;

  @ManyToOne(() => Brands, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'brand' })
  brand: Brands;

  @ManyToOne(() => Originals, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'original' })
  original: Originals;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  warranty: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  vat: string;

  @Column({ type: 'varchar', length: 50 })
  profit: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => UnitProduct, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'unit_product' })
  unit_product: UnitProduct;

  @Column({
    type: 'enum',
    enum: ['active', 'delete', 'hide'],
    default: 'active',
  })
  status: string;

  @OneToMany(() => PictureProduct, (pictureProducts) => pictureProducts.product)
  picture_urls: PictureProduct[];

  @OneToMany(() => CodeProduct, (codeProduct) => codeProduct.product)
  code_product: CodeProduct[];

  @OneToMany(() => ListDetail, (detail) => detail.product)
  details: ListDetail[];

  @ManyToOne(() => SupplierProduct, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'supplier_product' })
  supplier_product: SupplierProduct;

  

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
