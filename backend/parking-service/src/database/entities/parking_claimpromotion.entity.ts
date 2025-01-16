import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ParkingClaimPromotionBill } from './parking_claimpromotionbill.entity';
import { ParkingClaimPromotionBillV2 } from './parking_claimpromotionbillv2.entity';
import { ParkingClaimPromotionCoupon } from './parking_claimpromotioncoupon.entity';
import { ParkingClaimPromotionCouponV2 } from './parking_claimpromotioncouponv2.entity';

@Entity('parking_claimpromotion')
export class ParkingClaimPromotion {
  @PrimaryColumn({ length: 100 })
  id: string;

  @Column()
  user_id: number;

  @Column()
  parking_session_id: number;

  @Column()
  amount_a: number;

  @Column()
  amount_b: number;

  @Column()
  amount_c: number;

  @Column()
  amount_d: number;

  @Column()
  amount_e: number;

  @Column({ type: 'date', nullable: true })
  client_time: Date;

  @CreateDateColumn()
  server_time: Date;

  @Column({ type: 'tinyint' })
  used: boolean;

  @Column('longtext', { nullable: true })
  notes: string;

  @OneToMany(() => ParkingClaimPromotionBill, (post) => post.claimPromotion)
  claimPromotionBills: ParkingClaimPromotionBill[];

  @OneToMany(() => ParkingClaimPromotionBillV2, (post) => post.claimPromotion)
  claimPromotionBillsV2: ParkingClaimPromotionBillV2[];

  @OneToMany(() => ParkingClaimPromotionCoupon, (post) => post.claimPromotion)
  claimPromotionCoupon: ParkingClaimPromotionCoupon[];

  @OneToMany(() => ParkingClaimPromotionCouponV2, (post) => post.claimPromotion)
  claimPromotionCouponV2: ParkingClaimPromotionCouponV2[];
}
