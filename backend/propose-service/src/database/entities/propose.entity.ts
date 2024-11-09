import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ListProduct } from './list_product.entity';

@Entity()
export class Propose {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  propose_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_propose: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_end: Date;

  @Column({ type: 'enum', enum: ['vnd', 'usd'], default: 'vnd' })
  type_money: string;

  @Column({type:'int'})
  price:number

  @Column({ type: 'varchar', length: 50 })
  contract:string

  @Column({ type: 'enum', enum: ['none', 'before', 'after'], default: 'none' })
  type_discount: string;

  @Column({ type: 'enum', enum: ['draff', 'send', 'open', 'edit', 'refuse', 'accept'], default: 'draff' })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  staff_support: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  send_to: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date

  @OneToMany(() => ListProduct, listProduct => listProduct.product)
  products: ListProduct[];
}