import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Products } from './product.entity';
@Entity('Type_product')
export class TypeProducts {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_product_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50,nullable:true,unique:true })
  name_tag: string;

  @Column({ type: 'boolean', default:false })
  type: boolean;

  @OneToMany(() => Products, product => product.type)
  products: Products[];

}