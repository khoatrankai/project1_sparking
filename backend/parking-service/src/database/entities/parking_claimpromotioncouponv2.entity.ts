import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ParkingClaimPromotion } from "./parking_claimpromotion.entity";

@Entity('parking_claimpromotioncouponv2')
export class ParkingClaimPromotionCouponV2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  claim_promotion_id: number;

  @Column({ length: 512, nullable: true })
  company_info: string;

  @Column({ length: 250, nullable: true })
  coupon_code: string;

  @Column()
  coupon_amount: number;

  @Column('longtext', { nullable: true })
  notes: string;

  @ManyToOne(() => ParkingClaimPromotion, (claimPromotion) => claimPromotion.claimPromotionCouponV2, {
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        })
        @JoinColumn({ name: 'claim_promotion_id' })
        claimPromotion: ParkingClaimPromotion;
}
