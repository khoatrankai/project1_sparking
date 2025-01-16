import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ParkingClaimPromotion } from './parking_claimpromotion.entity';

@Entity('parking_claimpromotionbill')
export class ParkingClaimPromotionBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  claim_promotion_id: string;

  @Column({ length: 250, nullable: true })
  company_info: string;

  @Column({ length: 250, nullable: true })
  bill_number: string;

  @Column()
  bill_amount: number;

  @Column('longtext', { nullable: true })
  notes: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(
    () => ParkingClaimPromotion,
    (claimPromotion) => claimPromotion.claimPromotionBills,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn({ name: 'claim_promotion_id' })
  claimPromotion: ParkingClaimPromotion;
}
