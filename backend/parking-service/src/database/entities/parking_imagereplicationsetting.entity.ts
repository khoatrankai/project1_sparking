import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_imagereplicationsetting')
export class ParkingImageReplicationSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  sour_ip: string;

  @Column({ length: 2000 })
  dest_ip_list: string;
}
