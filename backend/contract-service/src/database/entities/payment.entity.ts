import { Entity, PrimaryColumn,JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne, Column } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class Payment {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  payment_id: string;

  @OneToOne(() => Contract)
  @JoinColumn({ name: 'contract' })
  contract: Contract;  

  @Column({ type: 'enum', enum: ['pending', 'success'], default: 'pending' })
  status: string;

  @Column({ type: 'enum', enum: ['default', 'time'], default: 'default' })
  type: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int',nullable:true })
  times: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date_expired: Date;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}