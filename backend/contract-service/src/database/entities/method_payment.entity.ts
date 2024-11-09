import { Entity, PrimaryColumn,JoinColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';
import { TypeMethod } from './type_method.entity';

@Entity()
export class MethodPayment {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  method_payment_id: string;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'payment' })
  payment: Payment;   

  @Column({ type: 'enum', enum: ['pending','fail', 'success'], default: 'pending' })
  status: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int',nullable:true })
  time: number;

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