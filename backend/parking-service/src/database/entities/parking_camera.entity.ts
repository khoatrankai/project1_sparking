import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('parking_camera')
export class ParkingCamera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  ip: string;

  @Column({ type: 'int' })
  position: number;

  @Column({ type: 'int' })
  direction: number;

  @Column({ type: 'varchar', length: 200 })
  serial_number: string;

  @Column({ type: 'int' })
  lane_id: number;
}