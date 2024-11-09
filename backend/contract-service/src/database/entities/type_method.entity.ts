import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany} from 'typeorm';
import { MethodPayment } from './method_payment.entity';

@Entity()
export class TypeMethod {
  @PrimaryColumn({ type: 'varchar', length: 50 })
 type_method_id: string;

 @Column({ type: 'varchar', length: 50 })
 name: string;

 @Column({ type: 'varchar', length: 50 })
 name_tag: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date

  @OneToMany(() => MethodPayment,  methodPayment => methodPayment.type_method)
  method_payment: MethodPayment[];
}