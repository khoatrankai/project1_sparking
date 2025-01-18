import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contract } from './contract.entity';

@Entity('document_contract')
export class DocumentContract {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  document_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @ManyToOne(() => Contract, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'contract' })
  contract: Contract;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
