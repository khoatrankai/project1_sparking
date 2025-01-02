import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from "typeorm";

@Entity('parking_claimpromotionvoucher')
@Unique(['short_value'])
export class ParkingClaimPromotionVoucher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column({ length: 250 })
  short_value: string;

  @Column()
  value: number;

  @CreateDateColumn()
  updated: Date;
}
