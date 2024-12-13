import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Method_payment')
export class MethodPayment {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  method_id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;
  
  @Column({ type: 'varchar', length: 50 })
  name_tag: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  created_at:Date

  @UpdateDateColumn()
  updated_at:Date
}