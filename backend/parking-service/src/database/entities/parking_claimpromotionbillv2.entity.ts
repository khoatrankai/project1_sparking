import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ParkingClaimPromotion } from "./parking_claimpromotion.entity";

@Entity('parking_claimpromotionbillv2')
export class ParkingClaimPromotionBillV2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  claim_promotion_id: number;

  @Column({ length: 512, nullable: true })
  company_info: string;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @Column({ length: 250, nullable: true })
  bill_number: string;

  @Column()
  bill_amount: number;

  @Column('longtext', { nullable: true })
  notes: string;

  @ManyToOne(() => ParkingClaimPromotion, (claimPromotion) => claimPromotion.claimPromotionBillsV2, {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    })
    @JoinColumn({ name: 'claim_promotion_id' })
    claimPromotion: ParkingClaimPromotion;
}
