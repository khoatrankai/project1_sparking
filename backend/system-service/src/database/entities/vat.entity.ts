import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Entity('vats')
export class Vats {
  @PrimaryGeneratedColumn('uuid')
  vat_id: string;

  @Column({ type: 'int' })
  type_vat: number;
}
