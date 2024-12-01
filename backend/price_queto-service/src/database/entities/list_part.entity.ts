import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ListProduct } from './list_product.entity';
import { PriceQuote } from './price_quote.entity';

@Entity()
export class ListParts {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  part_id: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => ListProduct, listProduct => listProduct.part)
  products: ListProduct[];

  @ManyToOne(() => PriceQuote, priceQuote => priceQuote.parts)
  @JoinColumn({ name: 'price_quote' })
  price_quote: PriceQuote;

  
}