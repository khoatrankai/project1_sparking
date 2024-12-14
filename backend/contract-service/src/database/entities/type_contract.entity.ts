import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class TypeContract {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  type_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_type: string;

  @Column({ type: 'int', default: 0 })
  count: number;

  @OneToMany(() => Contract,  contract => contract.type_contract)
  contracts: Contract[];
}