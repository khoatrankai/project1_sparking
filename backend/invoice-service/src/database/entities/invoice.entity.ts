import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  invoice_id: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  customer: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  contract: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @Column({ type: 'varchar', length: 50 })
  method_payment: string;

  @Column({ type: 'enum', enum: ['payed', 'half', 'waiting'], default: 'waiting' })
  status: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  staff_support: string;

  @Column({ type: 'enum', enum: ['vnd', 'usd'], default: 'vnd' })
  type_money: string;

  @Column({ type: 'int', nullable: true })
  date_renew: number;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'int', nullable: true })
  vat: number;

  @Column({ type: 'enum', enum: ['none', 'before', 'after'], default: 'none' })
  type_discount: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}