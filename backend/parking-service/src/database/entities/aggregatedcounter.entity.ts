import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('aggregatedcounter')
@Unique('IX_CounterAggregated_Key', ['key'])
export class AggregatedCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  key: string;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'datetime', nullable: true })
  ExpireAt: Date;
}