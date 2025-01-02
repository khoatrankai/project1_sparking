import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Unique } from "typeorm";
import { ParkingClaimPromotionGroupTenant } from "./parking_claimpromotiongrouptenant.entity";

@Entity('parking_claimpromotiontenant')
@Unique(['short_name']) // Đảm bảo tính duy nhất cho cột short_name
export class ParkingClaimPromotionTenant {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 500, name: 'name', nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 250, name: 'short_name' })
  short_name: string;

  @Column({ type: 'datetime', name: 'updated' })
  updated: Date;

  // Foreign key relationship
  @ManyToOne(() => ParkingClaimPromotionGroupTenant, (groupTenant) => groupTenant.claimPromotionTenants, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'group_tenant' })
  group_tenant: ParkingClaimPromotionGroupTenant;
}
