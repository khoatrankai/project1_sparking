import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Propose } from './propose.entity';

@Entity()
export class ListProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  PQ_product_id: string;

  @ManyToOne(() => Propose, propose => propose.propose_id)
  @JoinColumn({ name: 'propose_id' })
  propose: Propose;

  @Column({ type: 'varchar', length: 50 })
  product: string;

  @Column({type:'int'})
  price:number

  @Column({type:'int'})
  quantity:number

  @Column({type:'int'})
  vat:number

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}