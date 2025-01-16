import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('target_revenue')
export class TargetRevenue {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  target_id: string;

  @Column({ type: 'int', default: 0 })
  revenue: number;

  @Column({
    type: 'int',
    default: () => new Date().getFullYear(), // Lấy giá trị năm hiện tại
    unique: true, // Đảm bảo giá trị là duy nhất
  })
  year: number;
}
