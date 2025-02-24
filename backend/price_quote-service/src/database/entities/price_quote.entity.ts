import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ListParts } from './list_part.entity';

@Entity()
export class PriceQuote {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  price_quote_id: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  project: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @Column({ type: 'enum', enum: ['draff', 'send', 'open', 'edit', 'refuse', 'accept'], default: 'draff' })
  status: string;

  @Column({ type: 'enum', enum: ['vnd', 'usd'], default: 'vnd' })
  type_money: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  reference_code: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  user_support: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  customer: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  opportunity: string;

  @Column({ type: 'enum', enum: ['none', 'before', 'after'], default: 'none' })
  type_vat: string;

  @Column({ type: 'enum', enum: ['percent', 'money'], default: 'percent' })
  type_discount: string;

  @Column({ type: 'int',  default: 0 })
  discount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => ListParts, listPart => listPart.price_quote)
  parts: ListParts[];
}