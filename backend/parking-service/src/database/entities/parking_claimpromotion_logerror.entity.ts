import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('parking_claimpromotion_logerror')
export class ParkingClaimPromotionLogError {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  session_id: number;

  @Column({ type: 'datetime', nullable: true })
  server_time: Date;

  @Column({ type: 'datetime', nullable: true })
  client_time: Date;

  @Column({ length: 2000, nullable: true })
  sendata: string;

  @Column({ nullable: true })
  amount_a: number;

  @Column({ nullable: true })
  amount_b: number;

  @Column({ nullable: true })
  amount_c: number;

  @Column({ nullable: true })
  amount_d: number;

  @Column({ nullable: true })
  amount_e: number;

  @Column({ nullable: true })
  user_id: number;
}
