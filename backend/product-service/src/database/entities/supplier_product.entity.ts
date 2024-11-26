import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Products } from './product.entity';

@Entity('Supplier_product')
export class SupplierProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  supplier_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  phone_number: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  email: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Products, products => products.supplier_product)
  products: Products[];

}
