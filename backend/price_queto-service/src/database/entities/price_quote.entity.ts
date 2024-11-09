import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ListProduct } from './list_product.entity';

@Entity()
export class PriceQuote {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  price_quote_id: string;

  @Column({ type: 'varchar', length: 50 })
  customer: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @Column({ type: 'enum', enum: ['draff', 'send', 'open', 'edit', 'refuse', 'accept'], default: 'draff' })
  status: string;

  @Column({ type: 'enum', enum: ['vnd', 'usd'], default: 'vnd' })
  type_money: string;

  @Column({type:'int'})
  price:number

  @Column({type:'int'})
  vat:number

  @Column({ type: 'varchar', length: 50 })
  reference_code: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  user_support: string;

  @Column({ type: 'enum', enum: ['none', 'before', 'after'], default: 'none' })
  type_discount: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;


  @OneToMany(() => ListProduct, listProduct => listProduct.product)
  products: ListProduct[];
}