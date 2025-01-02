import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('parking_slot')
@Unique(['name'])
export class ParkingSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 20, nullable: true })
  prefix: string;

  @Column('varchar', { length: 20, nullable: true })
  suffixes: string;

  @Column('int', { nullable: true })
  numlength: number;

  @Column('int', { nullable: true })
  hascheckkey: number;

  @Column('int', { nullable: true })
  slottotal: number;
}
