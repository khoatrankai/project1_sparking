import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Products } from './product.entity';
@Entity('Brands')
export class Brands {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  brand_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Products, product => product.brand)
  products: Products[];

}