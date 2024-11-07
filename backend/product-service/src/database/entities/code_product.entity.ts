import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Products } from './product.entity';

@Entity('Code_product')
export class CodeProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  code_product_id: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({type:'enum',enum: ['stored','ordered','hired','error'],default:'stored'})
  status:string
 
  
  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product' })
  product: Products;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

}