import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TypeContract } from './type_contract.entity';

@Entity()
export class Contract {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  contract_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_contract: string;

  @Column({ type: 'varchar', length: 50 })
  project: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => TypeContract)
  @JoinColumn({ name: 'type_contract' })
  type_contract: TypeContract;  

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_start: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @Column({ type: 'enum', enum: ['delete', 'active', 'hide'], default: 'active' })
  status: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}