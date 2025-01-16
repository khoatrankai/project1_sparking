import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('unlockcard')
export class UnlockCard {
  @PrimaryColumn('varchar', { length: 45 })
  card_id: string;

  @Column('varchar', { length: 45, nullable: true })
  card_label: string;
}
