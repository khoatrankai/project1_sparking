import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('parking_parkingsetting')
export class ParkingSetting {
  @PrimaryColumn({ length: 100 })
  key: string;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 1000 })
  value: string;

  @Column({ length: 1000, nullable: true })
  notes: string;
}