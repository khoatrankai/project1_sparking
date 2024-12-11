import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ListProduct } from './list_product.entity';

@Entity()
export class ListDetailProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  detail_id: string;

  @ManyToOne(() => ListProduct, product => product.list_detail)
  @JoinColumn({ name: 'PQ_product' })
  PQ_product: ListProduct;

  @Column({type:'text'})
  description:string

  @Column({type:'int'})
  price:number

  @Column({type:'int'})
  quantity:number

  @Column({type:'varchar',length:50})
  unit:string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}