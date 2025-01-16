import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lockcard')
export class LockCard {
  @PrimaryGeneratedColumn()
  card_label: string;
}
