import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { ParkingLane } from "./parking_lane.entity";
import { AuthUser } from "./auth_user.entity";

@Entity('parking_usershift')
export class ParkingUserShift {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AuthUser, user => user.parkingUserShifts)
  @JoinColumn({ name: 'user_id' })
  user_id: AuthUser;

  @ManyToOne(() => ParkingLane, lane => lane.parkingUserShifts)
  @JoinColumn({ name: 'lane_id' })
  lane_id: ParkingLane;

  @Column('datetime')
  begin: Date;

  @Column('datetime', { nullable: true })
  end: Date;

  @Column('longtext', { nullable: true })
  info: string;
}