import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ParkingTerminal } from './parking_terminal.entity';
import { AuthUser } from './auth_user.entity';
import { ParkingVehicleBlacklist } from './parking_vehiclebalcklist.entity';
import { GateNotified } from './gatenotified.entity';

@Entity('parking_currentbalckliststate')
export class ParkingCurrentBlacklistState {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(
    () => ParkingVehicleBlacklist,
    (blacklist) => blacklist.currentBlacklistStates,
    { nullable: true },
  )
  @JoinColumn({ name: 'blacklist' })
  blacklist: ParkingVehicleBlacklist;

  @ManyToOne(() => ParkingTerminal, (gate) => gate.currentBlacklistStates, {
    nullable: true,
  })
  @JoinColumn({ name: 'gate' })
  gate: ParkingTerminal;

  @ManyToOne(() => AuthUser, (user) => user.currentBlacklistStates, {
    nullable: true,
  })
  @JoinColumn({ name: 'user' })
  user: AuthUser;

  @Column({ type: 'datetime', name: 'date', nullable: true })
  date: Date;

  @Column({ type: 'int', name: 'stateparking', nullable: true })
  stateparking: number;

  @Column({ type: 'int', name: 'state', nullable: true })
  state: number;

  @Column({ type: 'text', name: 'notes', nullable: true })
  notes: string;

  @Column({ type: 'int', name: 'parking_id', nullable: true })
  parking_id: number;

  @Column({ type: 'varchar', length: 128, name: 'image_path', nullable: true })
  image_path: string;

  @OneToMany(() => GateNotified, (post) => post.blacklistStateEntity)
  gateNotifieds: GateNotified[];
}
