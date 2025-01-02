import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('parking_cardtype')
export class ParkingCardType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  code: string;
}