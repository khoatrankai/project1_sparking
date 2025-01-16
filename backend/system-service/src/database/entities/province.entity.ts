import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Entity('provinces')
export class Province {
  @PrimaryGeneratedColumn('uuid')
  province_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_province: string;
}
