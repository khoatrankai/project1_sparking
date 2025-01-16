import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from './product.entity';

@Entity('picture_product')
export class PictureProduct {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  picture_id: string;

  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => Products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product' })
  product: Products;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
