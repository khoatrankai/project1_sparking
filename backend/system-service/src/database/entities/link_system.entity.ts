import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Entity('linkSystem')
export class LinkSystems {
  @PrimaryGeneratedColumn('uuid')
  link_system_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name_tag: string;

  @Column({ type: 'text' })
  link: string;
}
