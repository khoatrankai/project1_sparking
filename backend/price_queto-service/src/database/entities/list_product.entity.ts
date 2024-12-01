import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ListParts } from './list_part.entity';

@Entity()
export class ListProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  PQ_product_id: string;

  @ManyToOne(() => ListParts, part => part.products)
  @JoinColumn({ name: 'part' })
  part: ListParts;

  @Column({ type: 'varchar', length: 50 })
  product: string;

  @Column({type:'int'})
  price:number

  @Column({type:'int'})
  quantity:number

  @Column({ type: 'varchar', length: 50,nullable:true })
  vat:string

  @Column({ type: 'varchar', length: 50,nullable:true })
  profit:string

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}