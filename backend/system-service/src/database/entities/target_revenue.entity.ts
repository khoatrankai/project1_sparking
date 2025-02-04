import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('target_revenue')
export class TargetRevenue {
  @PrimaryGeneratedColumn('uuid')
  target_id: string;

  @Column({ type: 'bigint', default: 0 })
  revenue: number;

  @Column({
    type: 'int',
    default: () => new Date().getFullYear(), // Lấy giá trị năm hiện tại
    unique: true, // Đảm bảo giá trị là duy nhất
  })
  year: number;
}
