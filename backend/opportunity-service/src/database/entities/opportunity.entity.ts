import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeSources } from './type_source.entity';
import { TypeOpportunities } from './type_opportunity.entity';

@Entity('opportunities')
export class Opportunities {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  opportunity_id: string;

  @ManyToOne(
    () => TypeOpportunities,
    (typeOpportunity) => typeOpportunity.opportunities,
    { onDelete: 'SET NULL' },
  )
  @JoinColumn({ name: 'type_opportunity' })
  type_opportunity: TypeOpportunities;

  @ManyToOne(() => TypeSources, (typeSource) => typeSource.opportunities, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'type_source' })
  type_source: TypeSources;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_support: string;

  @Column({ type: 'text', nullable: true })
  list_label: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name_contact: string;

  @Column({
    type: 'enum',
    enum: ['delete', 'hide', 'success', 'pending', 'cancel'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  company_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  position: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province: string;

  @Column({ type: 'int', nullable: true })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'datetime', nullable: true })
  latch_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
