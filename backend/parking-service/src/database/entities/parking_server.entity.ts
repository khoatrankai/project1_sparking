import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_server')
export class ParkingServer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 50 })
  ip: string;
}
