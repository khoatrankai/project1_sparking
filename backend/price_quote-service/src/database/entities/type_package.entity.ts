import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ListParts } from './list_part.entity';

@Entity()
export class TypePackage {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  package_id: string;

  @Column({ type: 'varchar', length: 50 })
  name_package: string;

  @OneToMany(() => ListParts,  part => part.type_package)
  parts: ListParts[];
}