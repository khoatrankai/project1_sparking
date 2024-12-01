import { Entity, PrimaryColumn, Column, OneToMany} from 'typeorm';
import { Products } from './product.entity';
@Entity('Originals')
export class Originals {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  original_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Products, product => product.original)
  products: Products[];

}