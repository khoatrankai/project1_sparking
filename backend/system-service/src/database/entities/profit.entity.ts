import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Entity('profits')
export class Profits {
  @PrimaryGeneratedColumn('uuid')
  profit_id: string;

  @Column({ type: 'int' })
  type_profit: number;
}
