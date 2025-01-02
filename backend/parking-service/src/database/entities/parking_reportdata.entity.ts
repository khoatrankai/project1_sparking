import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_reportdata')
// @Index('parking_reportdata_7f12bbd9', ['time'])
export class ParkingReportData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  time: Date;

  @Column('varchar', { length: 4000 })
  check_in: string;

  @Column('varchar', { length: 4000 })
  check_out: string;
}
