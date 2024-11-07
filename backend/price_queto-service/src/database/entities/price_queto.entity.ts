import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
  staff_support: string;

  @Column({ type: 'enum', enum: ['none', 'before', 'after'], default: 'none' })
  type_discount: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}