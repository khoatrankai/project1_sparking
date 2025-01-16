import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('blacklistplate')
export class BlacklistPlate {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'varchar', length: 45 })
  PlateNumber: string;

  @Column({ type: 'int' })
  PlateStatus: number;

  @Column({ type: 'int', nullable: true })
  TerminalId: number;

  @Column({ type: 'int' })
  CreatedBy: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  Description: string;

  @Column({ type: 'bit' })
  Active: boolean;

  @Column({ type: 'int', nullable: true })
  LaneId: number;
}
