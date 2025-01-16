import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ParkingTerminal } from './parking_terminal.entity';

@Entity('parking_terminalgroup')
export class ParkingTerminalGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @OneToMany(() => ParkingTerminal, (terminal) => terminal.terminal_group)
  terminals: ParkingTerminal[];
}
