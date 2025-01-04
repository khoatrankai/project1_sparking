import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Products } from './product.entity';
import { ClassifyType } from './classify_type.entity';
@Entity('Type_product')
export class TypeProducts {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_product_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text',nullable:true})
  description: string;

  @Column({ type: 'varchar', length: 50,nullable:true,unique:true })
  name_tag: string;

  @ManyToOne(() => ClassifyType,{onDelete:'SET NULL'})
  @JoinColumn({ name: 'classify_type' })
  classify_type: ClassifyType;

  @OneToMany(() => Products, product => product.type)
  products: Products[];

}