import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ParkingCurrentBlacklistState } from "./parking_currentbalckliststate.entity";

@Entity('gatenotified')
export class GateNotified {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  blacklistState: number;

  @Column({ type: 'varchar', length: 256, nullable: true })
  gatereceive: string;

  @ManyToOne(() => ParkingCurrentBlacklistState, (state) => state.gateNotifieds, { eager: true })
  @JoinColumn({ name: 'blackliststate' })
  blacklistStateEntity: ParkingCurrentBlacklistState;


//   @OneToMany(() => ParkingCurrentBlacklistState, (djangoAdminLog) => djangoAdminLog.gateNotifieds)
//   company: ParkingCurrentBlacklistState[];
  
}