import { Entity, PrimaryColumn,JoinColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';
import { TypeMethod } from './type_method.entity';

@Entity()
export class Payment {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  payment_id: string;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract' })
  contract: Contract;  

  @Column({ type: 'enum', enum: ['pending','fail', 'success'], default: 'pending' })
  status: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'enum', enum: ['export','import'], default: 'export' })
  type:string

  @Column({ type: 'text',nullable:true })
  description: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  type_product: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  supplier: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date

  @ManyToOne(() => TypeMethod)
  @JoinColumn({ name: 'type_method' })
  type_method: TypeMethod;  
}