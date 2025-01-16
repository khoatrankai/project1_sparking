import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('list_tb_sp')
export class ListTBSP {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  tb_sp_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_tb' })
  product_tb: Product;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_vt' })
  product_vt: Product;
}
