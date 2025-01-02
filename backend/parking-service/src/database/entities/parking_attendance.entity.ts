import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuthUser } from "./auth_user.entity";
import { ParkingSession } from "./parking_parkingsession.entity";

@Entity('parking_attendance')
export class ParkingAttendance {
  @PrimaryGeneratedColumn()
  id: number;

//   @Column()
//   user_id: number;

  @Column()
  time_in: Date;

  @Column({ nullable: true })
  time_out: Date;

  @Column({ nullable: true, type: 'double' })
  total_time_of_date: number;

//   @Column({ nullable: true })
//   parking_session_id: number;

  @ManyToOne(() => ParkingSession)
  @JoinColumn({ name: 'parking_session_id' })
  parkingSession: ParkingSession;

  @ManyToOne(() => AuthUser)
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;
}
