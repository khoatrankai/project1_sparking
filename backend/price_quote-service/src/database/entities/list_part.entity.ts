import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ListProduct } from './list_product.entity';
import { PriceQuote } from './price_quote.entity';
import { TypePackage } from './type_package.entity';

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

  @ManyToOne(() => PriceQuote, priceQuote => priceQuote.parts,{onDelete:'CASCADE'})
  @JoinColumn({ name: 'price_quote' })
  price_quote: PriceQuote;

  @ManyToOne(() => TypePackage, typePackage => typePackage.parts,{onDelete:'SET NULL'})
  @JoinColumn({ name: 'type_package' })
  type_package: TypePackage;

  
}