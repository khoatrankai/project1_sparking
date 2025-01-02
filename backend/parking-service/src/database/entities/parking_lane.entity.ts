import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ParkingUserShift } from "./parking_usershift.entity";
import { ParkingTerminal } from "./parking_terminal.entity";

@Entity('parking_lane')
export class ParkingLane {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  direction: number;

  @Column({ type: 'tinyint' })
  enabled: boolean;

  @Column()
  vehicle_type: number;


  @ManyToOne(() => ParkingTerminal, user => user.lanes)
  @JoinColumn({ name: 'terminal_id' })
  terminal_id: ParkingTerminal;

  @OneToMany(() => ParkingUserShift, (post) => post.user_id)
  parkingUserShifts: ParkingUserShift[];
}
