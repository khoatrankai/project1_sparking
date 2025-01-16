import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ParkingTerminalGroup } from './parking_terminalgroup.entity';
import { ParkingCheckinImage } from './parking_checkinimage.entity';
import { ParkingCurrentBlacklistState } from './parking_currentbalckliststate.entity';
import { ParkingLane } from './parking_lane.entity';

@Entity('parking_terminal')
// @Index('parking_terminal_0edfff90', ['terminal_id'])
// @Index('parking_terminal_d0502e57', ['last_check_health'])
// @Index('parking_terminal_bcb36e14', ['terminal_group_id'])
export class ParkingTerminal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 50 })
  terminal_id: string;

  @Column('varchar', { length: 50 })
  ip: string;

  @Column('varchar', { length: 50, nullable: true })
  version: string;

  @Column('int')
  status: number;

  @Column('datetime')
  last_check_health: Date;

  @ManyToOne(() => ParkingTerminalGroup, (group) => group.terminals, {
    nullable: true,
  })
  @JoinColumn({ name: 'terminal_group_id' })
  terminal_group: ParkingTerminalGroup;

  @OneToMany(() => ParkingCheckinImage, (post) => post.terminal)
  checkinImages: ParkingCheckinImage[];

  @OneToMany(() => ParkingCurrentBlacklistState, (terminal) => terminal.gate)
  currentBlacklistStates: ParkingCurrentBlacklistState[];

  @OneToMany(() => ParkingLane, (terminal) => terminal.terminal_id)
  lanes: ParkingLane[];
}
