import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ParkingClaimPromotionTenant } from './parking_claimpromotiontenant.entity';

@Entity('parking_claimpromotiongrouptenant')
export class ParkingClaimPromotionGroupTenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 512, nullable: true })
  groupname: string;

  @CreateDateColumn()
  updated: Date;

  @OneToMany(() => ParkingClaimPromotionTenant, (post) => post.group_tenant)
  claimPromotionTenants: ParkingClaimPromotionTenant[];
}
