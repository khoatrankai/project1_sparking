import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany} from 'typeorm';
import { Payment } from './payment.entity';

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

  @OneToMany(() => Payment,  payment => payment.type_method)
  payment: Payment[];
}