import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { TypeContract } from './type_contract.entity';
import { Payment } from './payment.entity';

@Entity()
export class Contract {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  contract_id: string;

  @Column({ type: 'varchar', length: 50,unique:true })
  name_contract: string;

  @Column({ type: 'varchar', length: 50,unique:true })
  code_contract: string;

  @Column({ type: 'varchar', length: 50,nullable:true })
  project: string;

  @Column({ type: 'varchar', length: 50 })
  customer: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'enum', enum: ['default', 'time'], default: 'default' })
  type: string;

  @Column({ type: 'int',nullable:true })
  times: number;

  @ManyToOne(() => TypeContract, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'type_contract' })
  type_contract: TypeContract;  

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @Column({ type: 'enum', enum: ['delete', 'active', 'hide','completed'], default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date

  @OneToMany(() => Payment,  payment => payment.contract)
  payment: Payment[];
}