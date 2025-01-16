import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ParkingClaimPromotion } from './parking_claimpromotion.entity';

@Entity('parking_claimpromotioncoupon')
export class ParkingClaimPromotionCoupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  claim_promotion_id: string;

  @Column({ length: 250, nullable: true })
  company_info: string;

  @Column({ length: 250, nullable: true })
  coupon_code: string;

  @Column()
  coupon_amount: number;

  @Column('longtext', { nullable: true })
  notes: string;

  @ManyToOne(
    () => ParkingClaimPromotion,
    (claimPromotion) => claimPromotion.claimPromotionCoupon,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn({ name: 'claim_promotion_id' })
  claimPromotion: ParkingClaimPromotion;
}
