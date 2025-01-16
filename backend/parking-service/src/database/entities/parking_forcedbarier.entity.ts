import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_forcedbarier')
export class ParkingForcedBarrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  user: string;

  @Column({ length: 128, nullable: true })
  terminal: string;

  @Column({ length: 128, nullable: true })
  lan: string;

  @Column({ type: 'mediumtext', nullable: true })
  timestamp: string;

  @Column({ length: 256, nullable: true })
  frontpath: string;

  @Column({ length: 256, nullable: true })
  backpath: string;

  @Column({ type: 'datetime', nullable: true })
  forcedtime: Date;

  @Column({ length: 255, nullable: true })
  note: string;
}
